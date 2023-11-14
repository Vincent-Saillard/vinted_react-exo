import MultiRangeSlider from "multi-range-slider-react";
import "./Slider.css";

const Slider = ({
  minValue,
  maxValue,

  handleInput,
}) => {
  return (
    <div className="slider">
      <MultiRangeSlider
        min={0}
        max={500}
        step={5}
        minValue={minValue}
        maxValue={maxValue}
        ruler={false}
        label={false}
        onInput={(e) => {
          handleInput(e);
          // console.log(minValue, maxValue);
        }}
      />
    </div>
  );
};

export default Slider;
