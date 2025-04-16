import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import "../SearchAndApply.css";

const CustomToolTip = ({ methodIds, methods, title }) => {
  if (!methodIds) return null;

  const selectedIds = methodIds
    .split(",")
    .map((id) => id.trim())
    .map(Number);

  const matchedMethods = methods.filter((method) =>
    selectedIds.includes(method.id)
  );

  if (matchedMethods.length === 0) return null;

  const [firstMethod, ...otherMethods] = matchedMethods;

  return (
    <div
      className="delivery-methods-wrapper"
      style={{ display: "flex", alignItems: "center", gap: "4px" }}
    >
      <span className="delivery-methods">{firstMethod.name}</span>

      {otherMethods.length > 0 && (
        <Tooltip
          title={
            <div className="custom-tooltip-content">
              <div className="tooltip-header">{title}</div>
              {otherMethods.map((m) => (
                <ul key={m.id} className="tooltip-method">
                  <li>{m.name}</li>
                </ul>
              ))}
            </div>
          }
          placement="top"
          overlayClassName="custom-tooltip"
        >
          <InfoCircleOutlined
            style={{ fontSize: "14px", color: "#1890ff", cursor: "pointer" }}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default CustomToolTip;
