
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminLoggedIn') === 'true';
    if (!adminStatus) {
      window.location.href = '/admin/login';
      return;
    }
    setIsLoggedIn(true);
    loadMockData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const allContent = [...products, ...users, ...orders, ...categories, ...banners];
      const filtered = allContent.filter(item => 
        JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContent(filtered);
    } else {
      setFilteredContent([]);
    }
  }, [searchQuery, products, users, orders, categories, banners]);

  const loadMockData = () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Samsung Galaxy M34 5G',
        price: 16999,
        originalPrice: 20999,
        category: 'Electronics',
        description: 'Latest smartphone with 5G connectivity',
        image: 'https://readdy.ai/api/search-image?query=modern%20smartphone%20samsung%20galaxy%20with%20sleek%20design%20professional%20white%20background&width=300&height=300&seq=prod1&orientation=squarish',
        stock: 150,
        status: 'Published',
        featured: true
      },
      {
        id: '2', 
        name: 'Apple iPhone 14',
        price: 69999,
        originalPrice: 79999,
        category: 'Electronics',
        description: 'Premium iPhone with advanced camera system',
        image: 'https://readdy.ai/api/search-image?query=apple%20iphone%2014%20premium%20smartphone%20sleek%20design%20white%20background%20professional%20product%20photography&width=300&height=300&seq=prod2&orientation=squarish',
        stock: 75,
        status: 'Published',
        featured: true
      },
      {
        id: '3',
        name: 'Sony WH-1000XM4 Headphones',
        price: 24999,
        originalPrice: 29999,
        category: 'Electronics',
        description: 'Noise-canceling wireless headphones',
        image: 'https://readdy.ai/api/search-image?query=sony%20wireless%20headphones%20premium%20noise%20canceling%20white%20background%20professional%20product%20shot&width=300&height=300&seq=prod3&orientation=squarish',
        stock: 0,
        status: 'Draft',
        featured: false
      }
    ];

    const mockCategories = [
      {
        id: '1',
        name: 'Electronics',
        description: 'Latest electronic gadgets and devices',
        image: 'https://readdy.ai/api/search-image?query=modern%20electronics%20category%20icon%20smartphone%20laptop%20headphones%20minimal%20white%20background&width=200&height=200&seq=cat1&orientation=squarish',
        status: 'Published',
        itemCount: 150
      },
      {
        id: '2',
        name: 'Fashion',
        description: 'Trendy clothing and accessories',
        image: 'https://readdy.ai/api/search-image?query=fashion%20category%20clothing%20accessories%20trendy%20style%20minimal%20white%20background&width=200&height=200&seq=cat2&orientation=squarish',
        status: 'Published',
        itemCount: 200
      },
      {
        id: '3',
        name: 'Home & Kitchen',
        description: 'Home appliances and kitchen essentials',
        image: 'https://readdy.ai/api/search-image?query=home%20kitchen%20appliances%20modern%20design%20minimal%20white%20background&width=200&height=200&seq=cat3&orientation=squarish',
        status: 'Draft',
        itemCount: 75
      }
    ];

    const mockBanners = [
      {
        id: '1',
        title: 'Mega Sale 50% Off',
        subtitle: 'Limited time offer on electronics',
        image: 'https://readdy.ai/api/search-image?query=mega%20sale%20banner%20electronics%20discount%20modern%20blue%20gradient%20background%20professional%20ecommerce&width=800&height=300&seq=banner1&orientation=landscape',
        link: '/electronics',
        status: 'Published',
        order: 1
      },
      {
        id: '2',
        title: 'New Arrivals',
        subtitle: 'Latest fashion trends',
        image: 'https://readdy.ai/api/search-image?query=new%20arrivals%20fashion%20banner%20trendy%20clothing%20modern%20colorful%20background%20ecommerce%20style&width=800&height=300&seq=banner2&orientation=landscape',
        link: '/fashion',
        status: 'Published',
        order: 2
      }
    ];

    const mockUsers = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 9876543210',
        joinDate: '2024-01-15',
        orders: 3,
        totalSpent: 45000,
        status: 'Active'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 9876543211',
        joinDate: '2024-01-20',
        orders: 2,
        totalSpent: 89998,
        status: 'Active'
      }
    ];

    const mockOrders = [
      {
        id: 'FK123456',
        userId: '1',
        customerName: 'Rajesh Kumar',
        total: 16999,
        status: 'Delivered',
        date: '2024-01-15',
        items: 1
      },
      {
        id: 'FK789012',
        userId: '2',
        customerName: 'Priya Sharma',
        total: 69999,
        status: 'Shipped',
        date: '2024-01-20',
        items: 1
      }
    ];

    setProducts(mockProducts);
    setUsers(mockUsers);
    setOrders(mockOrders);
    setCategories(mockCategories);
    setBanners(mockBanners);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminData');
    window.location.href = '/admin/login';
  };

  const handleAdd = (type: string) => {
    setModalType(type);
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleEdit = (item: any, type: string) => {
    setModalType(type);
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleSave = (formData: any) => {
    if (modalType === 'product') {
      if (editingItem) {
        setProducts(products.map(p => p.id === editingItem.id ? { ...p, ...formData } : p));
      } else {
        const newProduct = {
          id: Date.now().toString(),
          ...formData,
          status: 'Draft'
        };
        setProducts([...products, newProduct]);
      }
    } else if (modalType === 'category') {
      if (editingItem) {
        setCategories(categories.map(c => c.id === editingItem.id ? { ...c, ...formData } : c));
      } else {
        const newCategory = {
          id: Date.now().toString(),
          ...formData,
          itemCount: 0,
          status: 'Draft'
        };
        setCategories([...categories, newCategory]);
      }
    } else if (modalType === 'banner') {
      if (editingItem) {
        setBanners(banners.map(b => b.id === editingItem.id ? { ...b, ...formData } : b));
      } else {
        const newBanner = {
          id: Date.now().toString(),
          ...formData,
          order: banners.length + 1,
          status: 'Draft'
        };
        setBanners([...banners, newBanner]);
      }
    }
    
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handlePublish = (id: string, type: string) => {
    if (type === 'product') {
      setProducts(products.map(p => 
        p.id === id ? { ...p, status: p.status === 'Published' ? 'Draft' : 'Published' } : p
      ));
    } else if (type === 'category') {
      setCategories(categories.map(c => 
        c.id === id ? { ...c, status: c.status === 'Published' ? 'Draft' : 'Published' } : c
      ));
    } else if (type === 'banner') {
      setBanners(banners.map(b => 
        b.id === id ? { ...b, status: b.status === 'Published' ? 'Draft' : 'Published' } : b
      ));
    }
  };

  const handleDelete = (id: string, type: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'product') {
        setProducts(products.filter(p => p.id !== id));
      } else if (type === 'category') {
        setCategories(categories.filter(c => c.id !== id));
      } else if (type === 'banner') {
        setBanners(banners.filter(b => b.id !== id));
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <span className="text-sm text-gray-500">|</span>
              <Link
                href="/"
                className="text-[#2874f0] hover:text-blue-700 text-sm cursor-pointer hover:underline"
              >
                View Store
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, users, orders..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] text-sm"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer flex items-center space-x-2"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-logout-box-line"></i>
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveSection('overview')}
                className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-3 ${
                  activeSection === 'overview' ? 'bg-[#2874f0] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-dashboard-line"></i>
                </div>
                <span>Overview</span>
              </button>
              
              <button
                onClick={() => setActiveSection('products')}
                className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-3 ${
                  activeSection === 'products' ? 'bg-[#2874f0] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-product-hunt-line"></i>
                </div>
                <span>Products</span>
              </button>

              <button
                onClick={() => setActiveSection('categories')}
                className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-3 ${
                  activeSection === 'categories' ? 'bg-[#2874f0] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-grid-line"></i>
                </div>
                <span>Categories</span>
              </button>

              <button
                onClick={() => setActiveSection('banners')}
                className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-3 ${
                  activeSection === 'banners' ? 'bg-[#2874f0] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-image-line"></i>
                </div>
                <span>Banners</span>
              </button>
              
              <button
                onClick={() => setActiveSection('users')}
                className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-3 ${
                  activeSection === 'users' ? 'bg-[#2874f0] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-user-line"></i>
                </div>
                <span>Users</span>
              </button>
              
              <button
                onClick={() => setActiveSection('orders')}
                className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-3 ${
                  activeSection === 'orders' ? 'bg-[#2874f0] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-shopping-bag-line"></i>
                </div>
                <span>Orders</span>
              </button>
              
              <button
                onClick={() => setActiveSection('payment')}
                className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-3 ${
                  activeSection === 'payment' ? 'bg-[#2874f0] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-bank-card-line"></i>
                </div>
                <span>Payment Settings</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Search Results */}
          {searchQuery && filteredContent.length > 0 && (
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Search Results for "{searchQuery}"</h2>
              <div className="space-y-3">
                {filteredContent.slice(0, 10).map((item, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <p className="font-medium text-gray-800">{item.name || item.customerName || item.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.email || item.category || item.subtitle || `Order #${item.id}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-3xl font-bold text-[#2874f0]">{products.length}</p>
                      <p className="text-xs text-gray-500">{products.filter(p => p.status === 'Published').length} Published</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-product-hunt-line text-2xl text-[#2874f0]"></i>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Categories</p>
                      <p className="text-3xl font-bold text-green-600">{categories.length}</p>
                      <p className="text-xs text-gray-500">{categories.filter(c => c.status === 'Published').length} Published</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="ri-grid-line text-2xl text-green-600"></i>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Banners</p>
                      <p className="text-3xl font-bold text-orange-600">{banners.filter(b => b.status === 'Published').length}</p>
                      <p className="text-xs text-gray-500">{banners.length} Total</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <i className="ri-image-line text-2xl text-orange-600"></i>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-3xl font-bold text-purple-600">₹{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{orders.length} Orders</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="ri-money-dollar-circle-line text-2xl text-purple-600"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Section */}
          {activeSection === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
                <button 
                  onClick={() => handleAdd('product')}
                  className="bg-[#2874f0] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer flex items-center space-x-2"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-add-line"></i>
                  </div>
                  <span>Add Product</span>
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Stock</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium text-gray-800">{product.name}</p>
                                <p className="text-sm text-gray-600">ID: {product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{product.category}</td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-800">₹{product.price.toLocaleString()}</p>
                              <p className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(product, 'product')}
                                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handlePublish(product.id, 'product')}
                                className="text-green-600 hover:text-green-800 cursor-pointer"
                              >
                                {product.status === 'Published' ? 'Unpublish' : 'Publish'}
                              </button>
                              <button
                                onClick={() => handleDelete(product.id, 'product')}
                                className="text-red-600 hover:text-red-800 cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Categories Section */}
          {activeSection === 'categories' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Category Management</h2>
                <button 
                  onClick={() => handleAdd('category')}
                  className="bg-[#2874f0] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer flex items-center space-x-2"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-add-line"></i>
                  </div>
                  <span>Add Category</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {category.status}
                      </span>
                    </div>
                    
                    <img src={category.image} alt={category.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                    <p className="text-xs text-gray-500 mb-4">{category.itemCount} items</p>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(category, 'category')}
                        className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handlePublish(category.id, 'category')}
                        className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors duration-200 cursor-pointer text-sm"
                      >
                        {category.status === 'Published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, 'category')}
                        className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 cursor-pointer"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-delete-bin-line"></i>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Banners Section */}
          {activeSection === 'banners' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Banner Management</h2>
                <button 
                  onClick={() => handleAdd('banner')}
                  className="bg-[#2874f0] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer flex items-center space-x-2"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-add-line"></i>
                  </div>
                  <span>Add Banner</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {banners.map((banner) => (
                  <div key={banner.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start space-x-6">
                      <img src={banner.image} alt={banner.title} className="w-48 h-24 object-cover rounded-lg" />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{banner.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            banner.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {banner.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{banner.subtitle}</p>
                        <p className="text-sm text-gray-500 mb-4">Link: {banner.link} | Order: {banner.order}</p>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(banner, 'banner')}
                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handlePublish(banner.id, 'banner')}
                            className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors duration-200 cursor-pointer text-sm"
                          >
                            {banner.status === 'Published' ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            onClick={() => handleDelete(banner.id, 'banner')}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200 cursor-pointer text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Section */}
          {activeSection === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Contact</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Join Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Orders</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total Spent</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-800">{user.name}</p>
                              <p className="text-sm text-gray-600">ID: {user.id}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-gray-800">{user.email}</p>
                              <p className="text-sm text-gray-600">{user.phone}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{new Date(user.joinDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-gray-600">{user.orders}</td>
                          <td className="px-6 py-4 font-medium text-gray-800">₹{user.totalSpent.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 cursor-pointer">View</button>
                              <button className="text-green-600 hover:text-green-800 cursor-pointer">Edit</button>
                              <button className="text-red-600 hover:text-red-800 cursor-pointer">Block</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Items</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-800">#{order.id}</td>
                          <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                          <td className="px-6 py-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-gray-600">{order.items}</td>
                          <td className="px-6 py-4 font-medium text-gray-800">₹{order.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 cursor-pointer">View</button>
                              <button className="text-green-600 hover:text-green-800 cursor-pointer">Update</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-smartphone-line text-[#2874f0]"></i>
                    </div>
                    <span>UPI Payment Settings</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                      <input
                        type="text"
                        defaultValue="sonickuwal@paytm"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Merchant Name</label>
                      <input
                        type="text"
                        defaultValue="Flipkart Store"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                      />
                    </div>
                    
                    <button className="w-full bg-[#2874f0] text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                      Update UPI Settings
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-bank-line text-green-600"></i>
                    </div>
                    <span>Bank Account Settings</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                      <input
                        type="text"
                        defaultValue="****1234567890"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                      <input
                        type="text"
                        defaultValue="HDFC0001234"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                      <input
                        type="text"
                        defaultValue="Flipkart Pvt Ltd"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                      />
                    </div>
                    
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                      Update Bank Details
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
                
                <div className="space-y-3">
                  {[
                    { id: 'TXN001', amount: 16999, method: 'UPI', status: 'Success', date: '2024-01-15' },
                    { id: 'TXN002', amount: 69999, method: 'Bank Transfer', status: 'Success', date: '2024-01-20' },
                    { id: 'TXN003', amount: 24999, method: 'UPI', status: 'Pending', date: '2024-01-25' }
                  ].map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{transaction.id}</p>
                        <p className="text-sm text-gray-600">{transaction.method} • {new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">₹{transaction.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Modals */}
      {(showAddModal || showEditModal) && (
        <ContentModal
          isOpen={showAddModal || showEditModal}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
          type={modalType}
          item={editingItem}
          isEdit={showEditModal}
        />
      )}
    </div>
  );
}

// Content Modal Component
function ContentModal({ isOpen, onClose, onSave, type, item, isEdit }: any) {
  const [formData, setFormData] = useState(item || {});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === 'product' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] pr-8"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home & Kitchen</option>
                  <option value="Books">Books</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock || ''}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  placeholder="https://readdy.ai/api/search-image?query=your-product-description&width=300&height=300&seq=unique&orientation=squarish"
                  required
                />
              </div>
            </>
          )}

          {type === 'category' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  placeholder="https://readdy.ai/api/search-image?query=category-description&width=200&height=200&seq=unique&orientation=squarish"
                  required
                />
              </div>
            </>
          )}

          {type === 'banner' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                <input
                  type="text"
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  placeholder="/category-name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                  placeholder="https://readdy.ai/api/search-image?query=banner-description&width=800&height=300&seq=unique&orientation=landscape"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#2874f0] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            >
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
