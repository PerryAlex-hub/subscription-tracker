import { SERVER_URL } from "../config/env.js";
import workflowClient from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

const createSubscription = async (req, res, next) => {
  try {
    const subscription = new Subscription({
      ...req.body,
      user: req.user._id,
    });

    await subscription.save();

    try {
      const result = await workflowClient.trigger({
        url: `${SERVER_URL}/api/workflow/subscriptions/reminder`,
        body: {
          subscriptionId: subscription._id.toString(),
        },
        headers: {
          "Content-Type": "application/json",
        },
        retries: 0,
      });

      res
        .status(201)
        .json({
          success: true,
          data: subscription,
          workflowRunId: result.workflowRunId,
        });
    } catch (workflowError) {
      console.error("Workflow trigger error:", workflowError);
      res
        .status(201)
        .json({
          success: true,
          data: subscription,
          workflowError: workflowError.message,
        });
    }
  } catch (error) {
    next(error);
  }
};

const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export { createSubscription, getUserSubscriptions };
