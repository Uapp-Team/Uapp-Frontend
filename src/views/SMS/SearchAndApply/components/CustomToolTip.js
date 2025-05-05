import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import "../SearchAndApply.css";

const CustomToolTip = ({ methodIds, methods, title = "Others" }) => {
  if (!methodIds) return null;

  const ids = methodIds
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  if (methods && methods.length > 0) {
    const matched = methods.filter((m) =>
      ids.includes(m.id?.toString() || m.name)
    );
    if (matched.length === 0) return null;

    const [first, ...others] = matched;

    return (
      <div
        className="delivery-methods-wrapper"
        style={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        <span className="delivery-methods fw-600">{first.name}</span>
        {others.length > 0 && (
          <Tooltip
            title={
              <div className="custom-tooltip-content">
                {others.map((item) => (
                  <div className="tooltip-method">
                    <span key={item.id}>{item.name}</span>
                  </div>
                ))}
              </div>
            }
            placement="top"
            overlayClassName="custom-tooltip"
            color="white"
          >
            <InfoCircleOutlined
              style={{ fontSize: "14px", color: "#5D5D5D", cursor: "pointer" }}
            />
          </Tooltip>
        )}
      </div>
    );
  }

  const [first, ...others] = ids;

  return (
    <div
      className="delivery-methods-wrapper"
      style={{ display: "flex", alignItems: "center", gap: "4px" }}
    >
      <span className="delivery-methods fw-600">{first}</span>

      {others.length > 0 && (
        <Tooltip
          title={
            <div className="custom-tooltip-content">
              {others.map((val, idx) => (
                <div className="tooltip-method">
                  <span key={idx}>{val}</span>
                </div>
              ))}
            </div>
          }
          placement="top"
          overlayClassName="custom-tooltip"
          color="white"
        >
          <InfoCircleOutlined
            style={{
              fontSize: "14px",
              color: "#5D5D5D",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default CustomToolTip;
