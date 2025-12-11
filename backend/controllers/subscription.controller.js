import { Subscription } from "../models/subscription.model.js";

const registeringSubscriptions = async (req, res) => {
  const { title, amount, dueDate, period } = req.body;
  if ([title, dueDate, period].some(field => !field)) {
    return res.status(401).json(
      {
        message: "Missing Credentials."
      }
    )
  }

  if (amount == 0 || amount < 0) {
    return res.status(401).json(
      {
        message: "Please enter valid amount."
      }
    )
  }

  const newSubscription = await Subscription.create({
    title,
    amount,
    dueDate,
    period,
    owner: req.user.id
  })

  return res.status(201).json(
    {
      message: "Subscription created successfully.",
      subscription: newSubscription
    }
  )
}

const cancellingSubscriptions = async (req, res) => {
  const noteId = req.params.id;
  const deletdSubscription = await Subscription.findByIdAndDelete(noteId);
  if (!deletdSubscription) {
    return res.status(404).json(
      {
        message: "Subscription not found."
      }
    )
  }

  return res.status(200).json(
    {
      message: "Subscription cancelled successfully."
    }
  )
}

const updatingSusbcriptions = async (req, res) => {
  const noteId = req.params.id;
  const { title, amount, dueDate, period } = req.body;

  const updatedSubscription = await Subscription.findByIdAndUpdate(
    noteId,
    {
      title,
      amount,
      dueDate,
      period
    },
    { new: true }
  )

  if (!updatedSubscription) {
    return res.status(404).json(
      {
        message: "Subscription not found."
      }
    )
  }

  return res.status(200).json(
    {
      message: "Subscription updated successfully.",
      subscription: updatedSubscription
    }
  )
}

const fetchSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find(
      {
        owner: req.user.id
      }
    ).sort({ dueDate: 1 })
    if (!subscriptions) {
      return res.status(201).json({
        message: "No subscriptions found.",
        subscriptions: []
      })
    }
    return res.status(200).json(
      {
        message: "Subscriptions fetched successfully.",
        subscriptions: subscriptions
      }
    )
  } catch (error) {
      return res.status(500).json(
        {
          message: "Error in fetching the subscriptions.",
          subscriptions: []
        }
      )
  }
}
export { registeringSubscriptions, fetchSubscriptions, cancellingSubscriptions, updatingSusbcriptions };