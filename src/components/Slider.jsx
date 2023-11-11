import MultiRangeSlider from "multi-range-slider-react";
import "./Slider.css";

const Slider = ({
  minValue,
  maxValue,
  set_minValue,
  set_maxValue,
  handleInput,
}) => {
  //   const [minValue, set_minValue] = useState(25);
  //   const [maxValue, set_maxValue] = useState(75);
  //   const handleInput = (e) => {
  //     set_minValue(e.minValue);
  //     set_maxValue(e.maxValue);
  //   };

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
          console.log(minValue, maxValue);
        }}
      />
    </div>
  );
};

export default Slider;
