import ActionModel from "../models/actionModel.js";
import BeneficiaryUserModel from "../models/beneficiaryUserModel.js";
import DonorsUserModel from "../models/donorsUserModel.js";
import OrderModel from "../models/orderModel.js";
import RepresentativeModel from "../models/RepresentativeModel.js";

const get = async (req, res, next) => {
  try {
    const [
      representative,
      donors,
      beneficiary,
      actionAgg,
      order,
    ] = await Promise.all([
      RepresentativeModel.countDocuments({}),
      DonorsUserModel.countDocuments({}),
      BeneficiaryUserModel.countDocuments({}),
      ActionModel.aggregate([
        
        {
          $group: {
            _id: null,
            
            total: {
              $sum: {
                $convert: { input: "$price", to: "double", onError: 0, onNull: 0 },
              },
            },
          },
        },
      ]),
      OrderModel.countDocuments({}),
    ]);

    const action = actionAgg?.[0]?.total ?? 0;

    return res.status(200).json({
      success: true,
      data: { representative, donors, beneficiary, action, order },
    });
  } catch (error) {
    next(error);
  }
};

export default { get };
