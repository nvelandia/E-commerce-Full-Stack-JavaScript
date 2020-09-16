import React from "react";
import {Link} from "react-router-dom"
import {Button, Carousel} from "react-bootstrap"
import {AiFillStar,AiOutlineStar} from "react-icons/ai"
import {useState} from 'react'
import styles from './ProductCard.module.css'

const HowManyStars = (review) => {
    switch (review) {
        case 1:
            return <span>
            {<AiFillStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            
        </span>//1 sola estrella
            
        case 2: 
            return  <span>
            {<AiFillStar />}
            {<AiFillStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
            
        </span>//3 estrellas
        
        case 3: 
            return <span>
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiOutlineStar/>}
            {<AiOutlineStar/>}
        </span> //3 estrellas
             
        case 4:
            return <span>
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiFillStar/>}
            {<AiOutlineStar/>}
        </span>//4 estrellas
            
        case 5:
            return <span>
                {<AiFillStar/>}
                {<AiFillStar/>}
                {<AiFillStar/>}
                {<AiFillStar/>}
                {<AiFillStar/>}
            </span> //3 estrellas
        
        default:
          return <span>
          {<AiOutlineStar/>}
          {<AiOutlineStar/>}
          {<AiOutlineStar/>}
          {<AiOutlineStar/>}
          {<AiOutlineStar/>}
        </span> //estrellas vacias
      }
}
// props.data.images.length && <img src={props.data.images && props.data.images[0].img_url} className="card-img" alt={`Imagen ${props.data.name}`}/>
const ProductCard = (props) =>{

        const [index,setIndex] = useState(0)
        const handleSelect = (selectedIndex, e) => {
            setIndex(selectedIndex);
          };


        return(
            <Link to={`/products/${props.data.product_id}`}  className={`${styles.linkProductCard} mr-4 mb-3  ${props.data.stock<=0?`${styles.noDisponible}`:null} `}>

            <div  className={`${styles.card} d-flex ${styles.productCard} mr-3 mx-auto ${styles.cardStyles}`} >               
                <Carousel className={`${styles.carouselCard} ${styles.cardImg}`} controls={props.data.images.length >= 2 && 'true'} activeIndex={index} onSelect={handleSelect} >{props.data.images.map(function(image){
                    return <Carousel.Item ><img className={`d-block w-100 `} controls={false} src={image.img_url}/></Carousel.Item>
                })}
                </Carousel>

                <div className="info-card">
                    <h5 className={`card-title ${styles.productTitle}`}>{props.data.name}</h5>
                    <p className={`card-star ${styles.estrella}`}>{HowManyStars(props.data.stock)}</p>
                    <p className="card-text font-weight-bold">$ {Number.parseFloat(props.data.price).toFixed(2)}</p>
                </div>
                <hr className="hr"/>
                
                <Button className={`mt-2 w-75 align-self-center nodisplay`} className={`${styles.btnComprar}`} ><b>Ver detalles</b></Button>
            </div>
        </Link>
            
        )
    }


export default ProductCard