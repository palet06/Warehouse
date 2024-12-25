import { ApiResponseType } from "@/app/types/data-types/dataTypes";

export const getdata = async (): Promise<ApiResponseType> => {
  const response: ApiResponseType = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Data fetched successfully",
        data: {
          content: [
            {
              id: "3546547",
              name: "Murat",
              surname: "Hayaloğlu",
              age: 30,
              email: "murat.hayaloglu@csgb.gov.tr",
            },
            {
              id: "3657896",
              name: "ddd",
              surname: "dfdf",
              age: 51,
              email: "murat.hayaloglu@csgb.gov.tr",
            },
            {
              id: "3654786",
              name: "Murat",
              surname: "Hayaloğlu",
              age: 30,
              email: "murat.hayaloglu@csgb.gov.tr",
            },
           
          ],
        },
      });
    }, 1000);
  });

  return response;
};
