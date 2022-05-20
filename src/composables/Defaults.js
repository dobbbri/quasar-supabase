import useConfig from 'src/composables/defaults/Config';
import useAttribute from 'src/composables/defaults/Attribute';
import useFormatter from 'src/composables/defaults/Formatter';

export default function useDefauts() {
  const { config } = useConfig();
  const { attribute } = useAttribute();
  const { formatter } = useFormatter();

  return {
    cfg: config,
    attr: attribute,
    fmt: formatter
  };
}
