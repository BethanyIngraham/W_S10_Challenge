import React, {useReducer} from 'react'
import { useCreateOrderMutation } from '../state/pizzaApi'


const CHANGE_FULL_NAME = 'CHANGE_FULL_NAME'
const SELECT_ORDER_SIZE = 'SELECT_ORDER_SIZE'
const CHOOSE_TOPPINGS = 'CHOOSE_TOPPINGS' 
const RESET_FORM = 'RESET_FORM'

const initialFormState = { 
  fullName: '',
  size: '',
  toppings: {
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}
}

const reducer = (state, action) => {
  switch(action.type) {
    case CHANGE_FULL_NAME:
      return {...state, fullName: action.payload}
    case SELECT_ORDER_SIZE:
      return {...state, size: action.payload}
    case CHOOSE_TOPPINGS:
      return {
        ...state,
        toppings: {
          ...state.toppings, 
          [action.payload]: !state.toppings[action.payload]
        }
      }
    case RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

const toppingsForOrder = (toppings) => {
  return Object.keys(toppings).filter(topping => toppings[topping])
}
  
export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, {error: orderCreationError, isLoading: creatingOrder}] = useCreateOrderMutation()

  const onFullNameChange = (evt) => {
    const { value } = evt.target
    dispatch({type: CHANGE_FULL_NAME, payload: value})
  }

  const onSizeChange = (evt) => {
    const { value } = evt.target
    dispatch({type: SELECT_ORDER_SIZE, payload: value})
  }

  const chooseTopping = (evt) => {
    const { name } = evt.target
    dispatch({type: CHOOSE_TOPPINGS, payload: name})
  } 

  const resetForm = () => {
    dispatch({type: RESET_FORM})
  }

  const onNewOrder = (evt) => {
    evt.preventDefault()
    const {fullName, size, toppings} = state
    createOrder({fullName, size, toppings: toppingsForOrder(toppings)})
    .unwrap()
    .then(data => {
      console.log(data)
      resetForm()
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>} 
      {orderCreationError && <div className='failure'>{orderCreationError.data.message}</div>} 

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            value={state.fullName}
            onChange={onFullNameChange}
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onSizeChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onClick={chooseTopping}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onClick={chooseTopping}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onClick={chooseTopping}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onClick={chooseTopping}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onClick={chooseTopping}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}


