import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  useColorMode,
  Text,
  Image,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authentication/action";
import { FaSun, FaMoon } from "react-icons/fa";
import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";
import { MdSearch, MdCancel } from "react-icons/md";
import { FaUser, FaUserSlash } from "react-icons/fa";
import { BiSolidLogInCircle, BiSolidLogOutCircle } from "react-icons/bi";

export const Navbar = ({ query, setQuery }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = () => {
    dispatch(logout).then((res) => {
      toast({
        title: `Logout Successfull`,
        status: "info",
        isClosable: true,
        position: "top",
        duration: "1000",
      });
    });
  };

  return (
    <Flex
      minW={"100%"}
      justify={"space-between"}
      align={"center"}
      bg={"black"}
      p={"1rem 3rem"}
    >
      <Flex justify={"center"} align={"center"} color={"white"} w={"6%"}>
        <Link to={"/"}>
          <Image src={logoDark} alt={"Home"} minW={"100%"} />
        </Link>
      </Flex>

      {/* search-bar */}
      <Flex
        w={{
          base: "20%",
          sm: "20%",
          md: "30%",
          lg: "40%",
          xl: "50%",
          "2xl": "50%",
        }}
        align={"center"}
      >
        <InputGroup>
          <InputLeftElement>
            <IconButton
              aria-label={"search"}
              icon={<MdSearch />}
              cursor={"default"}
            />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search your product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="filled"
            border={"none"}
            pl={"50px"}
            color={"white"}
          />
          {/* <InputRightElement>
            <IconButton
              aria-label={"search"}
              icon={<MdCancel />}
              onClick={() => setQuery("")}
              opacity={query ? "inherit" : "0"}
              cursor={query ? "pointer" : "default"}
              bg={"transparent"}
            />
          </InputRightElement> */}
        </InputGroup>
      </Flex>

      <Flex gap={".3rem"} align={"center"}>
        <Link to={"/admin"}>
          <IconButton
            aria-label={"admin"}
            icon={isAuth ? <FaUser /> : <FaUserSlash />}
            isRound
          />
        </Link>

        {isAuth ? (
          <Link>
            <IconButton
              aria-label={"auth"}
              icon={<BiSolidLogOutCircle />}
              isRound
              onClick={() => handleLogout()}
            />
          </Link>
        ) : (
          <Link to={"/login"}>
            <IconButton
              aria-label={"auth"}
              icon={<BiSolidLogInCircle />}
              isRound
            />
          </Link>
        )}

        <Link>
          <IconButton
            aria-label={"toggle"}
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            isRound
            onClick={toggleColorMode}
          />
        </Link>
      </Flex>
    </Flex>
  );
};
