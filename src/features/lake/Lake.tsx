import { Stage, Layer, Group, Circle, Image as ImageKonva } from "react-konva";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import Wolf from "../../assets/images/wolf.png";
import User from "../../assets/images/hare-boat.png";
import LakeImg from "../../assets/images/lake.png";
import { StageContainer } from "./styled";

interface Props {
  speed: number;
  isShowClue: boolean;
  setWinner: (winner: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const Lake = (props: Props) => {
  const { setWinner, speed, isShowClue, setIsModalOpen } = props;

  const width = window.innerWidth / 2;
  const height = window.innerHeight;
  const radius = width > 500 ? 200 : 100;

  const lakeImage = new Image();
  lakeImage.src = LakeImg;

  const predatorImage = new Image();
  predatorImage.src = Wolf;

  const userImage = new Image();
  userImage.src = User;

  const predatorScale = width > 500 ? 0.15 : 0.07;
  const userScale = width > 500 ? 0.1 : 0.05;

  const predatorOffset = width > 500 ? 25 : 10;
  const userOffset =
    width > 500
      ? {
        x: -25,
        y: -30
      }
      : {
        x: -12.5,
        y: -15
      };

  const lakeProps = {
    radius: radius,
    stroke: "black",
    strokeWidth: 1
  };
  const lakeImageProps = {
    radius: radius,
    width: radius * 2,
    height: radius * 2,
    x: -radius,
    y: -radius
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
    scaleX: userScale,
    scaleY: userScale,
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

    const [lakeImage, lake] = lakeGroup.children[0].children;
    const [predator, predatorPoint] = lakeGroup.children[1].children;
    const [boat, boatPoint] = lakeGroup.children[2].children;

    const radiusSqr = Math.pow(x, 2) + Math.pow(y, 2);
    const lakeRadiusSqr = Math.pow(radius, 2);

    const kUser = Math.sqrt(radiusSqr / lakeRadiusSqr);

    const boatPrevious = { x: boatPoint.attrs.x, y: boatPoint.attrs.y };
    const predatorPointPrevious = {
      x: predatorPoint.attrs.x,
      y: predatorPoint.attrs.y
    };

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
      (Math.atan2(predatorPointPrevious.y, predatorPointPrevious.x) * 180) /
      Math.PI;

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
        setWinner("wolf");
      } else {
        lake.attrs.stroke = "yellow";
        lake.attrs.strokeWidth = 3;
        setWinner("you");

        const personalScore = localStorage.getItem("lake_monster");
        if (personalScore) {
          const { ratio } = JSON.parse(personalScore);
          speed > ratio && setIsModalOpen(true);
        } else {
          setIsModalOpen(true);
        }
      }
    } else {
      lake.attrs.stroke = "black";
      lake.attrs.strokeWidth = 1;
      setWinner("");
    }
  };

  return (
    <StageContainer>
      <Stage
        width={width}
        height={height - 20}
        style={{ width }}
        onMouseMove={handleMove}
      >
        <Layer>
          <Group x={width / 2} y={height / 2 - 20}>
            <Group>
              <ImageKonva image={lakeImage} {...lakeImageProps} />
              <Circle {...lakeProps} />
            </Group>

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
      </Stage>
    </StageContainer>
  );
};
