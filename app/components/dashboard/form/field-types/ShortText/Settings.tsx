import Flex from "../../Flex";
import Switch from "../../Switch";
import { ChangeEvent } from "react";

const ShortTextSettings = ({
  required,
  onChangeRequired,
  enforceMaxCharacters = false,
  onChangeEnforceMaxCharacters,
  maxCharacters,
  onChangeMaxCharacters,
}: {
  required: boolean;
  onChangeRequired: () => void;
  enforceMaxCharacters?: boolean;
  onChangeEnforceMaxCharacters?: () => void;
  onChangeMaxCharacters?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxCharacters?: number;
}) => {
  return (
    <>
      <Flex>
        <p>Required</p>
        <Switch checked={required} onChange={onChangeRequired} />
      </Flex>
      <Flex>
        <p>Max Characters</p>
        <Switch
          checked={enforceMaxCharacters || typeof maxCharacters === "number"}
          onChange={() => {
            onChangeEnforceMaxCharacters && onChangeEnforceMaxCharacters();
          }}
        />
      </Flex>
      {enforceMaxCharacters ||
        (typeof maxCharacters === "number" && (
          <input
            type="text"
            className="w-full border-2 border-gray-200 font-lh rounded-md pl-3 py-2"
            placeholder="0 - 999,999,999"
            onChange={(e) => onChangeMaxCharacters && onChangeMaxCharacters(e)}
            defaultValue={maxCharacters}
          />
        ))}
    </>
  );
};

export default ShortTextSettings;
