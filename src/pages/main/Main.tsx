import {
  Stage,
  Layer,
  Group,
  Circle,
  Image as ImageKonva
} from "react-konva";
import React, { useState } from "react";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import Tiger from "../../assets/images/tiger.png";
import User from "../../assets/images/boat.png";
import {
  CurrentSpeed,
  GameContainer,
  Control,
  StageContainer,
  Problem,
  ClueCheckbox,
  Clue,
  ClueLabel
} from "./styled";


export const Main = () => {
  const [speed, setSpeed] = useState(2.5);
  const [isShowClue, toggleClue] = useState(false);
  const [whoWin, setWinner] = useState("");

  const width = window.innerWidth / 2;
  const height = window.innerHeight;
  const radius = width > 500 ? 200 : 100;

  const predatorImage = new Image();
  predatorImage.src = Tiger;

  const userImage = new Image();
  userImage.src = User;


  const predatorScale = width > 500 ? 0.05 : 0.03;
  const predatorOffset = width > 500 ? 25 : 15;
  const userOffset = width > 500 ? {
    x: -24,
    y: -14
  } : {
    x: -14,
    y: -10
  };

  const lakeProps = {
    radius: radius,
    fillRadialGradientStartPoint: { x: 0, y: 0 },
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: { x: 0, y: 0 },
    fillRadialGradientEndRadius: radius,
    fillRadialGradientColorStops: [0, "#001b50", 0.2, "#04318a", 0.4, "#012a75", 0.7, "#04318a", 1.0, "#3676ec"],
    stroke: "black",
    strokeWidth: 1
  };
  const predatorProps = {
    scaleX: predatorScale,
    scaleY: predatorScale,
    x: -predatorOffset,
    y: -radius - predatorOffset
  };
  const predatorPointProps = {
    x: 0,
    y: -radius
  };

  const userProps = {
    scaleX: predatorScale,
    scaleY: predatorScale,
    ...userOffset
  };
  const clueProps = {
    stroke: "black",
    strokeWidth: 1,
    radius: radius / speed,
    dash: [10, 5]
  };

  const handleMove = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const lakeGroup = stage?.find("Group")[0]! as unknown as any;

    const { x, y } = lakeGroup.getRelativePointerPosition();

    const lake = lakeGroup.children[0];
    const [predator, predatorPoint] = lakeGroup.children[1].children;
    const [boat, boatPoint] = lakeGroup.children[2].children;

    const radiusSqr = Math.pow(x, 2) + Math.pow(y, 2);
    const lakeRadiusSqr = Math.pow(radius, 2);

    const kUser = Math.sqrt(radiusSqr / lakeRadiusSqr);

    const boatPrevious = { x: boatPoint.attrs.x, y: boatPoint.attrs.y };
    const predatorPointPrevious = { x: predatorPoint.attrs.x, y: predatorPoint.attrs.y };

    let boatPointCurrent = { x: 0, y: 0 };

    if (radiusSqr <= lakeRadiusSqr) {
      boatPointCurrent.x = x;
      boatPointCurrent.y = y;
    } else {
      boatPointCurrent.x = x / kUser;
      boatPointCurrent.y = y / kUser;
    }

    boatPoint.x(boatPointCurrent.x);
    boatPoint.y(boatPointCurrent.y);

    boat.x(boatPointCurrent.x + userOffset.x);
    boat.y(boatPointCurrent.y + userOffset.y);


    const boatDistance = Math.sqrt(
      Math.pow(boatPointCurrent.x - boatPrevious.x, 2) +
      Math.pow(boatPointCurrent.y - boatPrevious.y, 2)
    );

    const predatorMaxDistance = boatDistance * speed;

    const predatorMaxAngle = (predatorMaxDistance * 180) / (Math.PI * radius);

    const boatAngleX = (Math.atan2(y, x) * 180) / Math.PI;
    const predatorAngleX =
      (Math.atan2(predatorPointPrevious.y, predatorPointPrevious.x) * 180) / Math.PI;

    let angleDiff = boatAngleX - predatorAngleX;
    // console.log(angleDiff);

    angleDiff =
      angleDiff < -180
        ? angleDiff + 360
        : angleDiff > 180
          ? angleDiff - 360
          : angleDiff;

    angleDiff =
      angleDiff > predatorMaxAngle
        ? predatorMaxAngle
        : angleDiff < -predatorMaxAngle
          ? -predatorMaxAngle
          : angleDiff;

    const angleRad = ((predatorAngleX + angleDiff) * Math.PI) / 180;
    const xPoint = radius * Math.cos(angleRad);
    const yPoint = radius * Math.sin(angleRad);

    predatorPoint.x(xPoint);
    predatorPoint.y(yPoint);

    predator.x(xPoint - predatorOffset);
    predator.y(yPoint - predatorOffset);

    let currentRadiusSqr = Math.round(
      Math.pow(boatPointCurrent.x, 2) + Math.pow(boatPointCurrent.y, 2)
    );

    if (currentRadiusSqr === lakeRadiusSqr) {
      if (
        xPoint.toFixed(2) === boatPointCurrent.x.toFixed(2) &&
        yPoint.toFixed(2) === boatPointCurrent.y.toFixed(2)
      ) {
        lake.attrs.stroke = "red";
        lake.attrs.strokeWidth = 3;
        setWinner("tiger");
      } else {
        lake.attrs.stroke = "yellow";
        lake.attrs.strokeWidth = 3;
        setWinner("you");
      }
    } else {
      lake.attrs.stroke = "black";
      lake.attrs.strokeWidth = 1;
      setWinner("");
    }
  };

  const handleSpeedChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.currentTarget.value));
  };

  const handleShowClue = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleClue(e.currentTarget.checked);
  };

  const result = () => {
    switch (whoWin) {
      case "you":
        return <div>You win!!!</div>;
      case "tiger":
        return <div>Tiger ate you :(</div>;
      default:
        return <div />;
    }
  };

  return (
    <GameContainer>
      <StageContainer>
        <Stage
          width={width}
          height={height - 20}
          style={{ width }}
          onMouseMove={handleMove}
        >
          <Layer>
            <Group x={width / 2} y={height / 2 - 20}>
              <Circle {...lakeProps} />

              <Group>
                <ImageKonva image={predatorImage} {...predatorProps} />
                <Circle {...predatorPointProps} />
              </Group>

              <Group>
                <ImageKonva image={userImage} {...userProps} />
                <Circle />
              </Group>

              {isShowClue && <Circle {...clueProps} />}
            </Group>
          </Layer>
        </Stage> </StageContainer>

      <Control>
        <Problem>
          The tiger wants to eat you. You need to escape. If you can touch shore
          even for a moment without the tiger already being upon you, you win.
          You can set how many times the tiger moves faster than you.
        </Problem>

        <CurrentSpeed>Speed ratio: {speed}</CurrentSpeed>
        <input
          type="range"
          max={4}
          min={1}
          defaultValue={speed}
          onChange={handleSpeedChanged}
          step="0.1"
        />
        <br />

        <Clue>
          <ClueCheckbox
            type="checkbox"
            id="clue"
            checked={isShowClue}
            onChange={handleShowClue}
          />
          <ClueLabel htmlFor="clue">Show clue</ClueLabel>
        </Clue>

        {result()}
      </Control>
    </GameContainer>
  );
};
