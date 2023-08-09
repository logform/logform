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
  maxCharacters?: number;
  onChangeMaxCharacters?: (e: ChangeEvent<HTMLInputElement>) => void;
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
          checked={enforceMaxCharacters}
          onChange={() => {
            onChangeEnforceMaxCharacters && onChangeEnforceMaxCharacters();
          }}
        />
      </Flex>
      {enforceMaxCharacters && (
        <input
          type="text"
          min={20}
          maxLength={maxCharacters}
          className="w-full border-2 border-gray-200 font-lh rounded-md pl-3 py-2"
          placeholder="0 - 999,999,999"
          onChange={(e) => onChangeMaxCharacters && onChangeMaxCharacters(e)}
        />
      )}
    </>
  );
};

export default ShortTextSettings;
