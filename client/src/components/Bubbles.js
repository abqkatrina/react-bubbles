import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle } from "@potion/element";
import { LinearGradient } from "@potion/extra";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <LinearGradient
          id="my-gradient"
          x1="(colors.code.hex) 5%"
          x2='(colors.code.hex) 40%'
          y1='(colors.code.hex) 70%'
          y2='(colors.code.hex) 100%'
        />
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill='url(#my-gradient)'
                      
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
