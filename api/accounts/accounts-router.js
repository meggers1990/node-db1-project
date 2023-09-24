const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await Accounts.getById(id);
    res.json(account);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const { name, budget } = req.body;
      const trimmedName = name.trim();
      const newAccount = await Accounts.create({ name: trimmedName, budget });
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, budget } = req.body;
      const trimmedName = name.trim();
      const updatedAccount = await Accounts.updateById(id, {
        name: trimmedName,
        budget,
      });
      res.json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAccount = await Accounts.deleteById(id);
    res.json(deletedAccount);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }

  res.status(500).json({ message: "Something went wrong" });
});

module.exports = router;