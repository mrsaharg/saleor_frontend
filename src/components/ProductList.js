import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS, DELETE_PRODUCT } from "../graphql/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../index.css";

const ProductList = () => {
    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        onCompleted: () => refetch(),
    });
    const navigate = useNavigate();

    const handleDelete = (sku) => {
        Swal.fire({
            title: "Confirmation Popup",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct({ variables: { sku } });
            }
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allProducts.map((product) => (
                        <tr key={product.sku}>
                            <td>{product.name}</td>
                            <td>{product.type}</td>
                            <td>{product.sku}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button className="edit-btn" onClick={() => navigate(`/edit-product/${product.sku}`)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(product.sku)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
