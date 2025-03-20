import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, GET_PRODUCTS } from "../graphql/queries";
import Swal from "sweetalert2";
import "../index.css";

const ProductForm = () => {
    const [formData, setFormData] = useState({ name: "", type: "", sku: "", quantity: 0 });

    const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS }],
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "quantity" ? Number(value) || 0 : value.trim(),
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log("Submitting:", formData);
        console.log("Quantity Type Before Submission:", typeof formData.quantity);

        try {
            const response = await createProduct({
                variables: {
                    name: formData.name,
                    type: formData.type,
                    sku: formData.sku,
                    quantity: formData.quantity,
                },
            });

            console.log("GraphQL Response:", response);
            console.log("Quantity Type After Submission:", typeof formData.quantity);


            Swal.fire({
                title: "Success!",
                text: "Product creation is in progress.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });

            setFormData({ name: "", type: "", sku: "", quantity: 0 });

        } catch (error) {
            console.error("GraphQL Error:", error);
            Swal.fire({
                title: "Error!",
                text: `Failed to add product: ${error.message}`,
                icon: "error",
            });
        }
    };

    return (
        <div className="product-form-container">
            <h2 className="form-title">Add Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sku">SKU</label>
                    <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? "Adding..." : "Create Product"}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
