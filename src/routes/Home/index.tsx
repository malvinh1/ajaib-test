import debounce from 'lodash.debounce';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Button from 'unify-react-desktop/build/Button';
import Pagination from 'unify-react-desktop/build/Pagination';
import Search from 'unify-react-desktop/build/Search';
import Select from 'unify-react-desktop/build/Select';
import Typography from 'unify-react-desktop/build/Typography';

import CustomTable from './components/Table';
import {marginRight, marginTop, SearchContainer} from './styles';

export default function Home() {
  const [fetchData, setFetchData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const [gender, setGender] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef<any>(null);

  const selectItems = [{value: 'All'}, {value: 'Male'}, {value: 'Female'}];

  useEffect(() => {
    let fetchUrl = `https://randomuser.me/api/?page=${currentPage}&results=5`;

    if (gender !== 'All') {
      fetchUrl += `&gender=${gender.toLowerCase()}`;
    }
    if (searchValue !== '') {
      fetchUrl += `&keyword=${searchValue}`;
    }

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((result) => setFetchData(result.results));
  }, [currentPage, gender, searchValue]);

  const handleSelectGender = (item: {value: string}) => {
    setGender(item.value);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  const resetFilter = () => {
    setSearchValue('');
    setGender('All');
  };

  return (
    <div>
      <SearchContainer>
        <div className={marginRight}>
          <Typography main tag={5} margin="0">
            Search
          </Typography>
          <Search
            ref={ref}
            placeholder="search"
            onChange={debouncedChangeHandler}
            onActionClick={() => {}}
          />
        </div>
        <div className={marginRight}>
          <Typography main tag={5} margin="0">
            Gender
          </Typography>
          <Select
            width="200px"
            items={selectItems}
            value={gender}
            onChange={handleSelectGender}
          />
        </div>
        <Button ghost alternate onClick={resetFilter}>
          Reset Filter
        </Button>
      </SearchContainer>

      <CustomTable data={fetchData} />

      <div className={marginTop}>
        <Pagination
          activeIndex={currentPage - 1}
          items={2}
          onChange={({currentIndex}) => setCurrentPage(currentIndex + 1)}
        />
      </div>
    </div>
  );
}
