import React, { useContext, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { UserContext } from "../Context/UserContext";
import { OrderContext } from "../Context/OrderContext";
import { CategoryContext } from "../Context/CategoryContext";
import { BrandContext } from "../Context/BrandContext";

const AdminDashboard = () => {
  const { allUsers } = useContext(UserContext);
  const { orders } = useContext(OrderContext);
  const { categories } = useContext(CategoryContext);
  const { brands } = useContext(BrandContext);

  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [orderTrends, setOrderTrends] = useState([]);

  // Generate a random hex color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  useEffect(() => {
    // Process category data
    if (categories?.length) {
      const formattedCategories = categories.map((category) => ({
        name: category.categoryName,
        value: category.productCount,
      }));
      setCategoryData(formattedCategories);
    }

    // Process brand data
    if (brands?.length) {
      const formattedBrands = brands.map((brand) => ({
        name: brand.brandName,
        value: brand.productCount,
      }));
      setBrandData(formattedBrands);
    }

    // Calculate user growth
    if (allUsers?.length) {
      const months = ["January", "February", "March", "April", "May", "June"];
      const userDistribution = Array(6).fill(0);

      allUsers.forEach((_, index) => {
        userDistribution[index % 6]++;
      });

      const userGrowthData = months.map((month, index) => ({
        month,
        count: userDistribution[index],
      }));

      setUserGrowth(userGrowthData);
    }

    // Process order trends
    if (orders?.length) {
      const monthCounts = {};
  
      orders.forEach((order) => {
        const dateString = order.createdAt?.$date || order.createdAt;
        const date = new Date(dateString);
  
        if (!isNaN(date)) {
          const monthYear = date.toLocaleString("default", { month: "short", year: "numeric" });
          monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
        }
      });
  
      // Convert object to array & sort it by date
      const orderTrendData = Object.keys(monthCounts)
        .map((month) => ({
          month,
          count: monthCounts[month],
          date: new Date(month), // Convert back to Date for sorting
        }))
        .sort((a, b) => a.date - b.date) // Sort in ascending order
  
        .map(({ month, count }) => ({ month, count })); // Remove the date key after sorting
  
      setOrderTrends(orderTrendData);
    }
  }, [categories, brands, allUsers, orders]);

  const totals = {
    users: allUsers?.length || 0,
    orders: orders?.length || 0,
    categories: categories?.length || 0,
    brands: brands?.length || 0,
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Stats Cards */}
      {Object.entries(totals).map(([key, value]) => (
        <div key={key} className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold capitalize">{key}</h3>
          <p className="text-3xl font-bold text-blue-600">{value}</p>
        </div>
      ))}

      {/* Category Distribution */}
      <div className="col-span-2 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRandomColor()} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No category data available.</p>
        )}
      </div>

      {/* Brand Statistics */}
      <div className="col-span-2 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Brand Statistics</h3>
        {brandData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={brandData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={getRandomColor()} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No brand data available.</p>
        )}
      </div>

      {/* User Growth */}
      <div className="col-span-2 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#4CAF50" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Order Trends */}
      <div className="col-span-2 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Order Trends</h3>
        {orderTrends.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={orderTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="count" stroke="#FFA500" fill="#FFA500" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No order data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
