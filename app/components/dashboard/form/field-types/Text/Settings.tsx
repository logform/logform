import Flex from "../../Flex";
import Switch from "../../Switch";
import { ChangeEvent } from "react";

const TextSettings = ({
  enforceMaxCharacters = false,
  onChangeEnforceMaxCharacters,
  maxCharacters,
  onChangeMaxCharacters,
}: {
  enforceMaxCharacters?: boolean;
  onChangeEnforceMaxCharacters?: () => void;
  onChangeMaxCharacters?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxCharacters?: number;
}) => {
  const isMaxCharacterEnforced =
    enforceMaxCharacters || maxCharacters !== undefined;

  return (
    <>
      <Flex>
        <p>Max Characters</p>
        <Switch
          checked={isMaxCharacterEnforced}
          onChange={() => {
            onChangeEnforceMaxCharacters && onChangeEnforceMaxCharacters();
          }}
        />
      </Flex>
      {isMaxCharacterEnforced && (
        <input
          type="text"
          className="w-full border-2 border-gray-200 font-lh rounded-md pl-3 py-2"
          placeholder="0 - 999,999,999"
          onChange={(e) => onChangeMaxCharacters && onChangeMaxCharacters(e)}
          value={isMaxCharacterEnforced && maxCharacters}
        />
      )}
    </>
  );
};

export default TextSettings;
