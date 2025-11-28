export interface SurveyResponse {
  Timestamp: string;
  Response: number;
  "1. Rate of increase": string;
  "2. Duplexes": string;
  "2. 3-6 units": string;
  "2. 7 to 15 units": string;
  "3. Attainable": string;
  "3. Affordable": string;
  "4. Att-Aff Explanation": string;
  "5. Lyme Common": string;
  "5. Lyme Center": string;
  "5. Commercial": string;
  "5. Rural": string;
  "5. East Lyme": string;
  "5. Holts Ledge": string;
  "5. Mtn & Forest": string;
  "5. Wherever SF units": string;
  "5. Nowhere": string;
  "5. Other": string;
  "6. Other explanation": string;
  "7. Housing in Commercial": string;
  "8. Multi-unit districts": string;
  "9. Infill": string;
  "10. Lyme School": string;
  "11. Lyme School Explanation": string;
  "12. Housing initiatives": string;
  "13. Years in Lyme": string;
  "14. Plan to move": string;
  "15. Explanation of moving": string;
  "16. Age range": string;
  "17. Smaller house": string;
  "18. Smaller house explanation": string;
  "19. Currently own": string;
  "20. Other thoughts": string;
}

export type ResponseStringKey = {
  [K in keyof SurveyResponse]: SurveyResponse[K] extends string ? K : never;
}[keyof SurveyResponse];
