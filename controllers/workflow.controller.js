import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import { sendReminderEmail } from "../utils/send-email.js";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1];

const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") {
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Subscription ${subscription._id} has expired. stopping workflow`,
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await context.run(`Sleep until reminder ${daysBefore} days before`, async () => {
        // Calculate timestamp inside the step to avoid serialization issues
        const timestamp = renewalDate.subtract(daysBefore, "day").valueOf();
        const sleepDate = new Date(timestamp);
        console.log(`Sleeping until ${sleepDate}`);
        await context.sleepUntil(sleepDate);
      });
      // Only trigger reminder after sleeping until the exact time
      await triggerReminder(context, `Reminder ${daysBefore} days before`, subscription, daysBefore);
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    const sub = await Subscription.findById(subscriptionId).populate("user", "name email").lean();
    return sub;
  });
};

const sleepUntilReminder = async (context, label, date) => {
  try {
    const reminderTime = date.toDate();
    if (!reminderTime || isNaN(reminderTime.getTime())) {
      console.error(`Invalid date for ${label}:`, date);
      return;
    }
    console.log(`Sleeping until ${label} reminder at ${reminderTime}`);
    // sleepUntil expects a Date object
    await context.sleepUntil(reminderTime);
  } catch (error) {
    console.error(`Error in sleepUntilReminder for ${label}:`, error);
  }
};

const triggerReminder = async (context, label, subscription, daysBefore) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder for subscription`);

    const reminderType = `${daysBefore} days before reminder`;
    
    await sendReminderEmail({
        to: subscription.user.email,
        type: reminderType,
        subscription: subscription,
    })
  });
};

export default sendReminders;
