import React, { useContext, useState } from "react";
// import { ProductContext } from "../Context/ProductContext";
import { server_url } from "../services/server_url";
import { deleteAProduct,updateProduct } from "../services/allAPIS";
import { toast, ToastContainer } from "react-toastify";
import { ProdcutContext } from "../Context/ProductContext";

function AdminViewProducts() {
  const { allProducts, fetchAllproducts } = useContext(ProdcutContext);

  const [editProduct, setEditProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedProduct((prev) => ({ ...prev, productImage: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setEditProduct(product);
    setUpdatedProduct({ ...product });
    setImagePreview(`${server_url}/uploads/${product.productImage}`);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setEditProduct(null);
    setUpdatedProduct({});
    setImagePreview("");
  };

  // Save Changes
  const saveChanges = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { authorization: `Bearer ${token}` };

      const formData = new FormData();
      Object.keys(updatedProduct).forEach((key) => {
        formData.append(key, updatedProduct[key]);
      });
      const result = await updateProduct(updatedProduct._id, formData, reqHeader);
      if (result.status === 200) {
        toast.success("Product updated successfully!");
        fetchAllproducts();
        closeEditModal();
      } else {
        toast.error("Failed to update product.");
      }
    }
  };       

  // Delete Product
  const deleteProduct = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { authorization: `Bearer ${token}` };
      const result = await deleteAProduct(id, reqHeader);
      if (result.status === 200) {
        toast.success("Item deleted successfully");
        fetchAllproducts();
      } else {
        toast.warn("Item deletion failed");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center text-green-700">All Products</h2>
      <p className="text-teal-500 text-center font-medium m-2">
        Total Products&nbsp;:&nbsp;{allProducts.length}
      </p>

      {allProducts?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">
                    <img
                      src={`${server_url}/uploads/${product.productImage}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.brand}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">${product.price}</td>
                  <td className="px-4 py-3">{product.totalQuantity} units</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-gray-700 text-lg">No products are available</h1>
      )}

      {/* Edit Modal */}
      {editProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-bold text-center text-gray-700 mb-4">Edit Product</h2>

      <label className="block text-gray-600 text-sm">Product Name:</label>
      <input
        type="text"
        name="name"
        value={updatedProduct.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
      />

      <label className="block text-gray-600 text-sm">Price:</label>
      <input
        type="number"
        name="price"
        value={updatedProduct.price}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
      />

      <label className="block text-gray-600 text-sm">Quantity:</label>
      <input
        type="number"
        name="totalQuantity"
        value={updatedProduct.totalQuantity}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
      />

      <label className="block text-gray-600 text-sm">Category:</label>
      <input
        type="text"
        name="category"
        value={updatedProduct.category}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
      />

      <label className="block text-gray-600 text-sm">Brand:</label>
      <input
        type="text"
        name="brand"
        value={updatedProduct.brand}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
      />

      <label className="block text-gray-600 text-sm">Descriptions:</label>
      {updatedProduct.descriptions.map((desc, index) => (
        <input
          key={index}
          type="text"
          name={`descriptions[${index}]`}
          value={desc}
          onChange={(e) => handleDescriptionChange(e, index)}
          className="w-full p-2 border rounded-md mb-2"
        />
      ))}
      <button onClick={addDescription} className="text-blue-600 text-sm mb-2">+ Add Description</button>

      <label className="block text-gray-600 text-sm">Specifications:</label>
      {updatedProduct.specifications.map((spec, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Key"
            value={spec.key}
            onChange={(e) => handleSpecificationChange(e, index, 'key')}
            className="w-1/2 p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Value"
            value={spec.value}
            onChange={(e) => handleSpecificationChange(e, index, 'value')}
            className="w-1/2 p-2 border rounded-md"
          />
        </div>
      ))}
      <button onClick={addSpecification} className="text-blue-600 text-sm mb-2">+ Add Specification</button>

      <label className="block text-gray-600 text-sm">Change Image:</label>
      <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded-md mb-2" />
      {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-24 object-cover rounded-md" />}

      <div className="flex justify-end mt-4">
        <button onClick={saveChanges} className="bg-green-600 text-white px-3 py-1 rounded-md mr-2">
          Save
        </button>
        <button onClick={closeEditModal} className="bg-gray-500 text-white px-3 py-1 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      <ToastContainer />
    </div>
  );
}

export default AdminViewProducts;
