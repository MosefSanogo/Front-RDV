import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./datePicker.css";
interface DateHeaderProps {
  value?: Date | null;
  onDateChange: (date: Date) => void;
  name: string;
}
const DatePickerValue: React.FC<DateHeaderProps> = ({
  value =  new Date(),
  onDateChange,
  name
}) => {
  value = new Date(localStorage.getItem(name) || new Date())
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs(value ));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Date"
          value={dateValue}
          onChange={(newValue) => {
            setDateValue(newValue);
            if (newValue) {
              const date = newValue.toDate();
              onDateChange(date);
              localStorage.setItem(name, date.toISOString());
            } else {
              localStorage.removeItem(name); 
            }
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              sx: {
                backgroundColor: "var(--bg-card)",
                borderRadius: "12px",

                /* INPUT TEXT */
                "& .MuiInputBase-input": {
                  color: "var(--text-primary)",
                },

                /* LABEL */
                "& .MuiInputLabel-root": {
                  color: "var(--text-primary)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--link)",
                },

                /* BORDER */
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border-default)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--link)",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "var(--link)",
                    borderWidth: "2px",
                  },

                /* ICON (calendar) */
                "& .MuiSvgIcon-root": {
                  color: "var(--text-secondary)",
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerValue;
