import * as React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
export interface RegisterContainerProps {}

const RegisterContainer: React.FunctionComponent<RegisterContainerProps> = () => {
        return (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-red-violet-500 via-red-500 to-blue-gem-500 ">
                        <div className="bg-white md:px-4 w-full px-2 mx-1 py-8 space-y-8 shadow-xl rounded-sm md:w-96 bg-opacity-90 fade-in">
                                <h1 className="font-semibold text-4xl text-center">Register Account</h1>
                                <Form className=" " name="basic" layout="vertical">
                                        <Form.Item label="Full Name" name="username">
                                                <Input />
                                        </Form.Item>
                                        <Form.Item label="Email" name="username">
                                                <Input />
                                        </Form.Item>
                                        <Form.Item label="Username" name="username">
                                                <Input />
                                        </Form.Item>
                                        <Form.Item label="Password" name="password">
                                                <Input.Password />
                                        </Form.Item>
                                        <Form.Item label="Confirm Password" name="password">
                                                <Input.Password />
                                        </Form.Item>

                                        <Form.Item>
                                                <Button type="primary" htmlType="submit" className="w-full">
                                                        Sign Up
                                                </Button>
                                        </Form.Item>
                                </Form>
                                <div className="flex items-center space-x-4">
                                        <div className="flex-1 bg-gray-300 h-0.5"></div>
                                        <p className="text-center">Or</p>
                                        <div className="flex-1 bg-gray-300 h-0.5"></div>
                                </div>
                                <Button type="default" htmlType="button" className="w-full">
                                        <Link to="/login">Login Instead</Link>
                                </Button>
                        </div>
                </div>
        );
};

export default RegisterContainer;
