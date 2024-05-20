import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'
import { useSelector, useDispatch } from 'react-redux'
import { selectSizeFilter } from '../state/filterSlice'

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery()
  // const filter = useSelector(st => st.filters.pizzaSize)
     const dispatch = useDispatch()

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        { 
          orders?.map((order) => {
            const { customer, id, size, toppings } = order
            const toppingsNumber = () => {
             if(toppings.length === 1) {
              return '1 topping'
             } else {
              return `${toppings.length} toppings`
             }
            }
            return (
              <li key={id}>
                <div>
                {toppings.length === 0 
                ? `${customer} ordered a size ${size} with no toppings`
                : `${customer} ordered a size ${size} with ${toppingsNumber()}`}
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
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            // actually filter here? 
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => {
                // dispatches action to reducer
              }}>{size}</button>
          })
        }
      </div>
    </div>
  )
}

