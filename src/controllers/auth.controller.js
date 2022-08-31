import usersModel from "../Models/users.model";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return Jwt.sign({ id }, "CleSecreteAMettreDansLeDotEnv", {
    expiresIn: maxAge,
  });
};

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existinUser = await usersModel.findOne({
      email: email,
    });

    if (existinUser) throw new Error(`User already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json("User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge }),
        res.status(200).json({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          token: token,
        });
    } else {
      return res.status(400).json({ user: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ token: "Token Expired" });
};
