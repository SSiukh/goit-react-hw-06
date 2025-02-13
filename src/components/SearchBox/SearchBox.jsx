import s from "./SearchBox.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.filters.name);

  return (
    <div className={s.box}>
      <h2 className={s.title}>Find contacts by name</h2>
      <input
        className={s.input}
        type="text"
        name="filter"
        onChange={(e) => {
          dispatch(changeFilter(e.target.value));
        }}
        value={value}
      />
    </div>
  );
};

export default SearchBox;
