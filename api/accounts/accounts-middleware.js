const yup = require("yup");
const Account = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const accountSchema = yup.object().shape({
    name: yup.string().required().trim().min(3).max(100),
    budget: yup.number().required().positive().max(1000000),
  });

  try {
    accountSchema.validateSync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const { id } = req.params;

  try {
    const existingAccount = await Account.query().findOne({ name });
    if (existingAccount) {
      return res.status(400).json({ message: "that name is taken" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const account = await Account.query().findById(id);
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }
    req.account = account;
    next();
  } catch (error) {
    next(error);
  }
};