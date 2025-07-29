import React,{ useState,useEffect} from "react";
import { UnitListInterface } from "../../interfaces/IList";
import { GetUnits } from "../../services/https/sellingproduct";

interface Props {
    onSelectUnit: (selectedUnit: number) => void;
    selectedValue?: number;
      }   

const SelectUnit: React.FC<Props> = ({onSelectUnit,selectedValue}) => {
  const [localSelectedValue, setLocalSelectedValue] = useState<number | undefined>(selectedValue);
  const [previousSelectedUnit,setPreviousSelectedUnit] = useState<number>()
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUnit = parseInt(event.target.value);
        setLocalSelectedValue(selectedUnit === 0 ? undefined : selectedUnit);
    };

    const handleClearClick = () => {
        setLocalSelectedValue(undefined);
      };

      const [unit, setUnit] = useState<UnitListInterface[]>([])
    const getUnit = async() => {
        let res = await GetUnits();
        if(res) { 
          setUnit(res);
          }  
    }

    useEffect(() => {
      const selectedUnit = localSelectedValue ?? selectedValue ?? 0;
      if (selectedUnit !== previousSelectedUnit) {
        // console.log("onSelectUnit called with:", selectedUnit);
        onSelectUnit(selectedUnit);
        setPreviousSelectedUnit(selectedUnit);
      }
    }, [localSelectedValue, selectedValue, onSelectUnit, previousSelectedUnit]);
    
    
    useEffect(() => {
      if (selectedValue !== undefined && unit.some((u: UnitListInterface) => u.ID === selectedValue)) {
        setLocalSelectedValue(selectedValue);
      }
    }, [selectedValue, unit]);
    
    
    useEffect(()=>{
        getUnit();
    },[]);
    return(
        <div className="relative flex w-64 flex-col border border-[#22668D] rounded-lg bg-white justify-center p-[4px] hover:border-[#FFCC70] focus:border-[#FFCC70] focus:shadow-sm focus:shadow-[#FFFADD]">
            {localSelectedValue !== undefined && (
            <button
              className="absolute bg-white mt-[-5px] text-black rounded-full z-50 left-[233px]  w-5 hover:text-red-500"
              onClick={handleClearClick}
            >
              x
            </button>
          )}
            <select className={`bg-white rounded-lg focus:outline-none flex flex-1 text-${selectedValue === undefined ? "black" : "black"} `}
            value={localSelectedValue ?? ""}
            onChange={handleSelectChange}>
                <option value="" disabled hidden className="text-gray-400" >
                    เลือกหน่วย
                </option>
                {unit.map((unit, index) => (
                    <option key={index} value={unit.ID} className={`bg-white hover:text-white  text-${selectedValue === unit.ID ? "black" : "[#22668D]"}`}>{unit.Name}</option>
        ))}
        </select>
        
      </div>
    )

}

export default SelectUnit;