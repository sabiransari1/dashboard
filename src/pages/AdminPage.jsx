import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Select,
  useColorMode,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { postProduct } from "../redux/products/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";

const initState = {
  image: "",
  name: "",
  brandName: "",
  price: "",
  size: "",
  gender: "",
  category: "",
};

export const AdminPage = () => {
  const [newProduct, setNewProduct] = useState(initState);
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { isLoading, isError, errMessage } = useSelector(
    (store) => ({
      isLoading: store.productsReducer.isLoading,
      isError: store.productsReducer.isError,
      errMessage: store.productsReducer.errMessage,
    }),
    shallowEqual
  );
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(postProduct(newProduct)).then((res) => {
      toast({
        title: `New Product Added Successfully`,
        status: "success",
        isClosable: true,
        position: "top",
        duration: "1000",
      });
    });
    setNewProduct(initState);
  };

  useEffect(() => {
    {
      isLoading
        ? toast({
            title: `Adding New Product`,
            status: "loading",
            isClosable: true,
            position: "top",
            duration: "500",
          })
        : isError
        ? toast({
            title: `${errMessage}`,
            status: "error",
            isClosable: true,
            position: "top",
            duration: "1000",
          })
        : "";
    }
  }, [isLoading, isError]);

  return (
    <Box textAlign={"center"}>
      <Box pos={"sticky"} top={"0"} zIndex={1}>
        <Navbar />
      </Box>

      <Box
        mt={"3rem"}
        boxShadow={
          colorMode === "light"
            ? "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
            : "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"
        }
        p={"3rem"}
        w={"40%"}
        m={"3rem auto"}
        borderRadius={"5px"}
      >
        <form onSubmit={handleAddProduct}>
          <Input
            type="text"
            name="image"
            placeholder="Enter image"
            defaultValue={newProduct.image}
            onChange={handleChange}
            variant="filled"
            size="lg"
            fontWeight={"semibold"}
            mb={"1rem"}
          />
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            defaultValue={newProduct.name}
            onChange={handleChange}
            variant="filled"
            size="lg"
            fontWeight={"semibold"}
            mb={"1rem"}
          />
          <Input
            type="text"
            name="brandName"
            placeholder="Enter brand name"
            defaultValue={newProduct.brandName}
            onChange={handleChange}
            variant="filled"
            size="lg"
            fontWeight={"semibold"}
            mb={"1rem"}
          />
          <Input
            type="number"
            name="price"
            placeholder="Enter price"
            defaultValue={newProduct.price}
            onChange={handleChange}
            variant="filled"
            size="lg"
            fontWeight={"semibold"}
            mb={"1rem"}
          />
          <Select
            name="category"
            defaultValue={newProduct.category}
            onChange={handleChange}
            variant="filled"
            size="lg"
            fontWeight={"semibold"}
            mb={"1rem"}
            cursor={"pointer"}
          >
            <option>Select Category</option>
            <option value="top-wear">Top Wear</option>
            <option value="bottom-wear">Bottom Wear</option>
            <option value="foot-wear">Foot Wear</option>
            <option value="cosmetic">Cosmetic</option>
            <option value="home-decor">Home Decor</option>
          </Select>
          <Select
            name="gender"
            defaultValue={newProduct.gender}
            onChange={handleChange}
            variant="filled"
            size="lg"
            fontWeight={"semibold"}
            mb={"1rem"}
            cursor={"pointer"}
          >
            <option>Select Gender</option>
            <option value="male">Men</option>
            <option value="female">Women</option>
            <option value="kids">Kids</option>
          </Select>
          <Select
            name="size"
            defaultValue={newProduct.size}
            onChange={handleChange}
            variant="filled"
            size="lg"
            fontWeight={"semibold"}
            mb={"1rem"}
            cursor={"pointer"}
          >
            <option>Select Size</option>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
            <option value="xl">X-Large</option>
            <option value="xxl">XX-Large</option>
          </Select>
          <Button bg={"orange"} w={"100%"} mt={"1rem"} size="lg" type="submit">
            Add Product
          </Button>
        </form>
      </Box>
    </Box>
  );
};
