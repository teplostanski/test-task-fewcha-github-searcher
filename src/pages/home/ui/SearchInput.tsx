import { Input } from '@heroui/react';
import { CiSearch as SearchIcon } from 'react-icons/ci';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from '../model/searchSlice';
import debounce from 'debounce';
import { DEBOUNCE_DELAY } from '../../../shared/constants/github';

export const SearchInput = memo(() => {
  const dispatch = useDispatch();

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  }, DEBOUNCE_DELAY);

  return (
    <Input
      onChange={handleChange}
      placeholder="Введите имя пользователя..."
      variant="bordered"
      startContent={
        <SearchIcon size={22} color="hsl(var(--heroui-default-100))" />
      }
      classNames={{
        innerWrapper: 'gap-2',
      }}
    />
  );
}); 