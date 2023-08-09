import Flex from "../../Flex";
import Switch from "../../Switch";

const ShortTextSettings = ({
  required,
  onChangeRequired,
  enforceMaxCharacters = false,
  onChangeEnforceMaxCharacters,
}: {
  required: boolean;
  onChangeRequired: () => void;
  enforceMaxCharacters?: boolean;
  onChangeEnforceMaxCharacters?: () => void;
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
    </>
  );
};

export default ShortTextSettings;
