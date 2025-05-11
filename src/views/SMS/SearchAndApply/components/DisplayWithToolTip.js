import { MoreOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

const DisplayWithTooltip = ({
  items,
  primaryCondition,
  secondaryCondition,
}) => {
  if (!items || items.length === 0) return null;

  const primaryItem = items.find(primaryCondition);

  const secondaryItems = items.filter(secondaryCondition);

  const displayedItem =
    primaryItem?.name || secondaryItems[0]?.name || secondaryItems[1]?.name;

  const remainingItems = secondaryItems.filter(
    (item) => item.name !== displayedItem
  );

  return (
    <div className="d-flex">
      <span>
        {displayedItem && <span className="generic-tag">{displayedItem}</span>}
      </span>
      <span>
        {remainingItems.length > 0 && (
          <Tooltip
            title={
              <div className="custom-tooltip-content">
                <div className="tooltip-method">
                  <div>
                    {remainingItems.map((item, index) => (
                      <div key={index}>{item.name}</div>
                    ))}
                  </div>
                </div>
              </div>
            }
            placement="top"
            overlayClassName="custom-tooltip"
            color="white"
          >
            <MoreOutlined
              rotate={90}
              style={{
                fontSize: "14px",
                color: "#5D5D5D",
                cursor: "pointer",
                border: "1px solid gray",
                borderRadius: "999px",
                marginLeft: "4px",
              }}
            />
          </Tooltip>
        )}
      </span>
    </div>
  );
};

export default DisplayWithTooltip;
