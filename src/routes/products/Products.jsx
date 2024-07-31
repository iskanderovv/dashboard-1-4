import { useOutletContext } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Table } from 'antd';
const { Column } = Table;

const Products = () => {
  const [data, loading] = useFetch('/product/all');
  const { termSearch } = useOutletContext();
  
  const filteredData = data?.filter((product) => {
    return (
      product.product_name.toLowerCase().includes(termSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(termSearch.toLowerCase()) ||
      product.description.toLowerCase().includes(termSearch.toLowerCase())
    );
  });

  return (
    <Table loading={loading} dataSource={filteredData} rowKey="_id">
      <Column
        title="Image"
        dataIndex="product_images"
        key="product_images"
        render={(images) => (
          <img
            src={images[0]}
            alt="Product"
            style={{ width: 50, height: 50, objectFit: 'contain' }}
          />
        )}
      />
      <Column title="Name" dataIndex="product_name" key="product_name" />
      <Column
        title="Original Price"
        dataIndex="original_price"
        key="original_price"
        render={(price) => `$${price}`}
      />
      <Column
        title="Category"
        dataIndex="category"
        key="category"
      />
      <Column
        title="In Stock"
        dataIndex="number_in_stock"
        key="number_in_stock"
      />
      <Column className='max-w-[350px]' title="Description" dataIndex="description" key="description" />
    </Table>
  );
};

export default Products;
