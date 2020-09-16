import React, { useState, useEffect } from 'react'
import styles from './orderStyle.module.css'
import { useSelector, useDispatch, connect } from 'react-redux'
import {add_product,set_id,set_owner,set_total_price,axiosProducts} from '../../redux/actions/order_info'
import axios from "axios"
import {useParams}  from 'react-router-dom'


function OrderInfo(props){
	const dispatch = useDispatch()
	const { id } = useParams()
	
	
	const sumaTotal=()=>{
		var suma = 0
		props.products_order.map(product => 
			suma += product.price*product.LineaDeOrden.quantity
			) 
		console.log(suma)
		return suma
		
	}
	
	

	useEffect(() => {
        dispatch(set_id(id))
        dispatch(axiosProducts(id))
    }, [])
	




	return(
		<div className='col-md-10 offset-1 mt-3'>>

			<div class="card container" style={{width: 50+'rem'}}>
			  <div class="card-body">
			    <h5 class="card-title">ORDEN ID: {id} </h5>
			    <h5 class="card-title"> Productos:  </h5>
			    <p class="card-text ">
			    <ul>
			   		{ props.products_order.map(product => 
			   			<li>
			    			{product.name}, Precio: $ {product.LineaDeOrden.price}, cantidad:  {product.LineaDeOrden.quantity}
			    		</li>   
			    	)}
			    </ul> 
			    </p>
			    <p class="card-text">{
			    	
			    	"TOTAL: $" + sumaTotal()
			    	

			    }  </p>
			    <span><a href="/orders/table/" class="btn btn-primary"> BACK</a></span>
			  </div>
			</div>
		</div>
		)
}


const mapStateToProps = state => {
  const productsOrder = state.orderInfo.products_order
  
  return {
    products_order: productsOrder,
             
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
    
}
    


export default connect(mapStateToProps, [])(OrderInfo)