import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT, UPDATE_PRODUCT } from "../graphql/queries";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
    const { sku } = useParams();
    const navigate = useNavigate();

    console.log("SKU from URL:", sku);


    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { sku },
        skip: !sku,
    });

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        quantity: 0,
    });

    useEffect(() => {
        if (data && data.getProduct) {
            setFormData({
                name: data.getProduct.name,
                type: data.getProduct.type,
                quantity: data.getProduct.quantity,
            });
        }
    }, [data]);

    const [updateProduct] = useMutation(UPDATE_PRODUCT, {
        onCompleted: () => navigate("/"),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!sku) {
            console.error("Error");
            return;
        }
        updateProduct({ variables: { sku, ...formData } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading product</p>;

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" value={formData.type} onChange={handleChange} required />
                </label>
                <label>
                    Quantity:
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                </label>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
