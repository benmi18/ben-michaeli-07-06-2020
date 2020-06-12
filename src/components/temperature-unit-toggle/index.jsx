import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { toggleTemperatureUnitAction } from "../../store/actions";
import './index.css';

const TemperatureUnitToggle = () => {
  const dispatch = useDispatch();
  const { selectedUnit } = useSelector(state => state.tempUnit);

  const handleToggleChange = (event) => {
    dispatch(toggleTemperatureUnitAction(event.target.innerText));
  }

  return (
    <div className="temperature-unit-container">
      <label className="label">Temperature Unit</label>
      <ToggleButtonGroup
        value={selectedUnit}
        exclusive
        onChange={(e) => handleToggleChange(e)}
      >
        <ToggleButton value="F">
          F
        </ToggleButton>

        <ToggleButton value="C">
          C
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default TemperatureUnitToggle;
