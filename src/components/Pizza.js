import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { formSchema } from "./schema";

const initialSetValues = {
    name:" ",
    size: " ",
    chicken: false,
    sausage: false,
    peppers: false,
    olives: false,
    special: ""
  }


const initalStateError = {
    name: "",
    special: ""
};  

export const Pizza = () => {
    const [formValues, setFormValues] = useState(initialSetValues);
    const [errors, setErrors] = useState(initalStateError);
    
        const onChangeHandler = (e) => {
            if (e.target.type === "checkbox") {
                setFormValues({
                    ...formValues,
                    [e.target.name]: !formValues[e.target.name],
                });
            } else {
                setFormValues({ ...formValues, [e.target.name]: e.target.value });
            }
            if (e.target.name === "special" || e.target.name === "name") {
                yup
                    .reach(formSchema, e.target.name)
                    .validate(e.target.value)
                    .then((valid) => {
                        setErrors({
                            ...errors,
                            [e.target.name]: "",
                        });
                    })
                    .catch((err) => {
                        setErrors({
                            ...errors,
                            [e.target.name]: err.errors[0],
                        });
                    });
            }
        };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formValues);
        axios.post("https://reqres.in/api/orders", formValues)
        .then((res) => {
            console.log(res.data);
        })
    };
    
    return (
        <div>
            <h1>Order Now</h1>
            <form onSubmit={onSubmitHandler} id="pizza-form">
                <input 
                onChange={onChangeHandler}
                id="name-input"
                name="name"
                value={formValues.name} 
                />
                {errors.name && <p>{errors.name}</p>}
				<select
					onChange={onChangeHandler}
					value={formValues.size}
					id="size-dropdown"
					name="size"
				>
					<option value=""> </option>
					<option value="small">Sm</option>
					<option value="medium">Md</option>
					<option value="large">Lg</option>
				</select>             
                    <input type="checkbox" checked={formValues.chicken} value="chicken" name="chicken" onChange={onChangeHandler}/>Chicken
                    <input type="checkbox" checked={formValues.sausage} value="sausage" name="sausage" onChange={onChangeHandler}/>Sausage
                    <input type="checkbox" checked={formValues.olives} value="olives" name="olives" onChange={onChangeHandler}/>Olives
                    <input type="checkbox" checked={formValues.peppers} value="peppers" name="peppers" onChange={onChangeHandler}/>Peppers
                    <input
                    id="special-text"
                    name="special"
                    onChange={onChangeHandler}
                    value={formValues.special}
                    />
                    {errors.special && <p>{errors.special}</p>}
                <button id="order-button">Submit</button>
            </form>
        </div>
    )
}
