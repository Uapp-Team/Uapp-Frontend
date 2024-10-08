import React, { useState } from 'react';

const ToggleSwitch2 = ({checked, onChange, style}) => {
    // const [isToggled, setIsToggled] = useState(false);
    // const onToggle = () => setIsToggled(!isToggled);
    return (
        <label style={style} className="toggle-switch">
      {/* <input type="checkbox" checked={isToggled} onChange={onToggle} /> */}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="switch" />
    </label>
    );
};

export default ToggleSwitch2;