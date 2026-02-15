import { memo } from "react";
import { useOther } from "@liveblocks/react/suspense";
import { connectionIdToColor } from "../utils";

type Props = {
  connectionId: number;
};

function Cursor({ connectionId }: Props) {
  //
  // RATIONALE:
  // Each cursor itself subscribes to _just_ the change for the user. This
  // means that if only one user's cursor is moving, only one <Cursor />
  // component has to re-render. All the others can remain idle.
  //
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const info = useOther(connectionId, (user) => user.info);

  const displayName = info?.name;

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <g
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        transition: "transform 80ms linear",
      }}
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={connectionIdToColor(connectionId)}
      />
      {info?.name && (
        <text
          x={20}
          y={10}
          fill={connectionIdToColor(connectionId)}
          fontSize={12}
          fontFamily="Kalam"
          fontWeight="bold"
          style={{
            textShadow: "0px 0px 4px rgba(255,255,255,0.8)",
          }}
        >
          {info.name}
        </text>
      )}
    </g>
  );
}

export default memo(Cursor);
