import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import styles from './index.module.scss'
import { useSelector, useDispatch, connect } from 'react-redux'
import { receiveProducts,fetchProducts, fetchUserCart, setId, changeQuantity, deleteProduct } from '../../redux/actions/actions'
import {loadUserData} from '../../redux/actions/auth'
import axios from "axios";


function Cart({products,isFetching,userInfo}) {
    const dispatch = useDispatch()
    const [cant, setCant] = useState(1)
    const [idCarrito,setIdCarrito] = useState()
    //var products = []
    //console.log(products)

    /*if(userInfo.role != "Guest"){
        console.log("USER INFO: ",userInfo.user_id)
        console.log("USER NAME: ",userInfo.first_name)
    }*/

   // const idUser = userInfo.user_id;
   // console.log("ID USERRRRRRRRRRRRRRRRR:"+idUser)

    
    const traerDatosCarrito = async() =>{
        userInfo.user_id && await axios.get(`http://localhost:3001/users/${userInfo.user_id}/cart`)
        .then(response => {
            
            setIdCarrito(response.data.order_id)

        })
        .catch(err => console.log(err))
    }

    const traerProductosCarrito = async(id) =>{
        await axios.get(`http://localhost:3001/users/${id}/cart`)
        .then(response => {
            products = response.data.products
            
            receiveProducts(products)
        })
        .catch(err => console.log(err))

    }
    
    
    const modificarCantidad = (cantidad, product_id) => {
        //usamos el user_id que está guardado en redux y no el que estaba
        // en el localStorage
        dispatch(changeQuantity(userInfo.user_id, product_id, cantidad));
    }
    //const idUser = localStorage.getItem("actualUserId"); --->
    // el idUser lo sacamos del store de redux 

    

    //idUser!=='Guest'  && traerDatosCarrito() && traerProductosCarrito(idUser)

    useEffect(() => {
        dispatch(setId(idCarrito))
        traerProductosCarrito(userInfo.user_id)
        traerDatosCarrito()
        //dispatch(loadUserData())
        dispatch(fetchUserCart(userInfo.user_id))
        

    }, [])

    return (
    <div className={`${styles.card} offset-1 col-md-10 col-12 mt-3 pt-4 pb-4`}>
            <h4 className='text-center pb-3'>Carrito de { userInfo.first_name } {userInfo.last_name} </h4>
            <span>Carrito ID:{idCarrito} </span>
            {products.length && products.map( product =>                 
               <div className='d-flex mb-4'>
                    <div className="imagen col-md-2 text-center d-flex align-items-center justify-content-center">
                        <img src={product.images[0].img_url} style={{height: '60px'}}/>
                    </div>
                    <div className="descripcion col-md-5 d-flex flex-column">
                        <h4 className='font-weight-bold'>{product.name}</h4>
                        <h5 className={styles.description}>{ `${product.description.substr(0,100)}...`}</h5>
                    </div>
                    <div className="cantidad col-md-2 text-center" style={{padding:0}}>
                        <div className="col-md-12 mb-1">
                            <Form.Control type="text" value={product.LineaDeOrden.quantity} className='m-auto col-md-4 text-center' />
                        </div>
                        <div className="buttons">
                            <Button className={`${styles.masMenos}`} onClick={ e => product.LineaDeOrden.quantity > 1 && dispatch(changeQuantity(userInfo.user_id, product.product_id, product.LineaDeOrden.quantity-1))}>-</Button>
                            <Button className={`${styles.masMenos}`} onClick={ e => dispatch(changeQuantity(userInfo.user_id, product.product_id, product.LineaDeOrden.quantity+1))}>+</Button>
                        </div>
                        <Form.Text className="text-muted">Stock: {product.stock} </Form.Text>
                    </div>

                    <div className="precio col-md-2 d-flex align-items-center justify-content-center ">
                        <h3 className={styles.price}>${product.price*product.LineaDeOrden.quantity}</h3>
                    </div>

                    <div className='eliminar col-md-1 d-flex justify-content-center align-items-center'>
                        <Button variant='danger' onClick={()=>dispatch(deleteProduct(localStorage.getItem('actualUserId'), product.product_id))}>
                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg> 
                        </Button>
                    </div>    
                    {isFetching && <div className={`${styles.spinnerContainer}`}>
                        <Spinner className={`${styles.spinnerCentrado}`} animation="grow" variant="warning" />
                    </div> }            
                </div> 
            )} 
            <span  className={`d-flex justify-content-end`} >
                <a href="/order" className="btn btn-warning font-weight-bold ">SIGUIENTE</a>            
            </span>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isFetching: state.cart.isFetching,
        products: state.cart.products.products || [],
        userInfo : state.auth
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
    
    return {
        //fetchProducts: () => dispatch(fetchProducts()),
        //fetchUserCart: () => dispatch(fetchUserCart()),
        loadUserData: () => dispatch(loadUserData())
    }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Cart)