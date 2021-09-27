import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerAction,
  removeCustomerAction,
} from "./store/customerReducer";
import { fetchCustomers } from "./asyncActions/customers";

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);

  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash });
  };
  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash });
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };

  return (
    <div className="App">
      <div
        style={{
          fontSize: "20px",
          width: "100px",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          border: "1px solid teal",
        }}
      >
        Balance: {cash}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={() => addCash(Number(prompt()))}>Add some cash</button>
        <button onClick={() => getCash(Number(prompt()))}>Get some cash</button>
      </div>
      <div>
        <button
          style={{ backgroundColor: "orange", color: "black" }}
          onClick={() => addCustomer(prompt())}
        >
          Add customer
        </button>
        <button
          style={{ backgroundColor: "orange", color: "black" }}
          onClick={() => dispatch(fetchCustomers())}
        >
          Get list of customers
        </button>
      </div>

      {customers.length > 0 ? (
        <div>
          {customers.map((customer) => (
            <div
              style={{
                fontSize: "20px",
                width: "200px",
                marginTop: "5px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "20px",
                border: "1px solid green",
              }}
              onClick={() => removeCustomer(customer)}
            >
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            fontSize: "20px",
            width: "200px",
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "20px",
            border: "1px solid red",
          }}
        >
          No customers found
        </div>
      )}
    </div>
  );
}

export default App;
