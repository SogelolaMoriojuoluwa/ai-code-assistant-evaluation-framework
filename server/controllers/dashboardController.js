import { getDashboard } from "../services/dashboardService.js";

export const getDashboardController = async (req, res) => {
  try {
    const { experimentId } = req.params;

    const dashboard = await getDashboard(experimentId);

    res.status(200).json({
      success: true,
      data: dashboard,
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};