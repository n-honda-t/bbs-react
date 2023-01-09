import { FC, memo, Suspense, useEffect, useState } from 'react'
import styled from "styled-components";
import { Layout } from '../components/Layout';
import { useFetcher } from '../hooks/useFetcher';

type User = {
  name: string,
  age: number
}
export const Counter: FC = memo(() => {
  const [ count, setCount ] = useState(0);
  const increment = () => setCount((v) => v + 1)
  const decrement = () => setCount((v) => v - 1)

  const [ honda, setHonda ] = useState<User>();
  const [ a, setA ] = useState<string[]>([]);
  const [ honda2, setHonda2 ] = useState<User>({
    name: 'honda',
    age: 29
  });
  const [ b, setB ] = useState<string[]>();
  console.log(honda, a)
  console.log(honda2, b)

  return (
      <div>
        <div>現在のカウント{count}</div>
        <div onClick={increment}>インクリメント</div>
        <div onClick={decrement}>デクリメント</div>
      </div>
  )
})
