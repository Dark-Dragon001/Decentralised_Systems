import "./harvestpage.css";
import React, {useState} from "react";

const HarvestPage = () => {

    const [values, setValues] = useState(
        { goods: "",
                    goodSize: "",
                    goodQuality: ""
        });

    const [submit, setSubmit] = useState(false);
    const [valid, setValid] = useState(false);

    // Event handler for Goods, GoodsSize, GoodsQuality.
    const handleGoodsInputChange = (event) => {
        setValues({...values, goods: event.target.value})
    }
    const handleGoodSizeInputChange = (event) => {
        setValues({...values, goodSize: event.target.value})
    }
    const handlegoodsQualityInputChange = (event) => {
        setValues({...values, goodQuality: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if ( values.goods && values.goodSize && values.goodQuality )
        {
            setValid(true);

        }
        setSubmit(true)
        console.log("Operation Successful!")
    }

    return  (
        <>
            <div className="havestPage_Cont">
                <form className= "harvestForm" onSubmit={handleSubmit}>
                    {submit && valid ?
                            <div className="submitNotification"> The goods have been moved to processing.</div>
                            :
                            null
                    }
                    <h1 className="formTitle"> Harvesting Stage</h1>
                    <label className= "goodsLabel"> Please enter the type of goods.</label>
                    <input className= "goods"
                           onChange={handleGoodsInputChange}
                           value={values.goods}
                           placeholder= "Goods"
                           required
                    />
                    {submit && values.goods ?
                                            <span className="enterGoods">Please enter one of the Goods above.</span>
                                            :
                                            null
                    }
                    <label className= "goodsSizeLabel"> Please enter the size of goods.</label>
                    <input className= "goodsSize"
                           onChange={handleGoodSizeInputChange}
                           value={values.goodSize}
                           placeholder= "Goods Size"
                           required
                    />
                    {submit && values.goodSize ?
                                                <span className="enterGoods">Please enter one of the Goods above.</span>
                                                :
                                                null
                    }
                    <label className= "goodQualityLabel"> Please enter goods quality.</label>
                    <input className= "goodQuality"
                           onChange={handlegoodsQualityInputChange}
                           value={values.goodQuality}
                           placeholder= "Goods Quality"
                           required
                    />
                    {submit && values.goodQuality ?
                                 <span className="enterGoods">Please enter one of the Goods above.</span>
                                :
                                 null
                    }
                    <input className="submitButton"
                            type="submit"
                           value="Send to Process"/>
                </form>
            </div>

        </>
    );
}

export default HarvestPage;