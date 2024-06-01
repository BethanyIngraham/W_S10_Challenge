import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'
import { useSelector, useDispatch } from 'react-redux'
import { selectSizeFilter } from '../state/filterSlice'

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery()
  const currentSize = useSelector(st => st.filters.pizzaSize)
  const dispatch = useDispatch()

  const filteredOrderList = currentSize === 'All'
  ? orders
  : orders?.filter(order => order.size === currentSize )

  const toppingsNumber = (toppings) => {
    if(!toppings) {
     return 'no toppings'
    } else if (toppings.length === 1) {
     return '1 topping'
    } else {
     return `${toppings.length} toppings`
    }
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        { filteredOrderList?.map((order) => {
            const { customer, id, size, toppings } = order
            return (
              <li key={id}>
                <div>
                {`${customer} ordered a size ${size} with ${toppingsNumber(toppings)}`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === currentSize ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => {
                dispatch(selectSizeFilter(size))
              }}>{size}</button>
          })
        }
      </div>
    </div>
  )
}

