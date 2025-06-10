import * as Joi from 'joi';
import { format, addDays, isValid } from 'date-fns';

export const handler = async (event: any) => {


  // Define validation schema
  const querySchema = Joi.object({
    date: Joi.string().required(),
    days: Joi.number().default(0)
  });

  try {
    // Validate query parameters
    const { error, value } = querySchema.validate(event.queryStringParameters || {});
    
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid input',
          details: error.details
        })
      };
    }

    // Parse and validate date
    const inputDate = new Date(value.date);
    if (!isValid(inputDate)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid date format'
        })
      };
    }

    // Add days to input date
    const resultDate = addDays(inputDate, value.days);
    
    // Format the result
    const formattedDate = format(resultDate, 'yyyy-MM-dd');

    return {
      statusCode: 200,
      body: JSON.stringify({
        inputDate: value.date,
        daysAdded: value.days,
        result: formattedDate
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        error: err.message
      })
    };
  }

}