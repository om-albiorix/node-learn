import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

console.log("user route");
const registerUser = asyncHandler(async (req, res) => {
  // console.log(res, "res", "resgisetesse", req);
  // return res.status(200).json({
  //   message: "ok",
  // });
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.find({
    $or: [{ username }, { email }],
  });

  if (existedUser.username) {
    throw new ApiError(409, "User with username and email already exists");
  }

  const avatarLocalPath = req.files.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;
  let coverImage;
  if (coverImageLocalpath) {
    coverImage = await uploadOnCloudinary(coverImageLocalpath);
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username?.toLowerCase,
  });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
