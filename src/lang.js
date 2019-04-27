import format from 'string-template'

const config = {
  languages: ['en', 'fr'],
  defaultLanguage: 'en',

  root: {
    home: {
      messages: {
        'en': {
          home_title: "AI World",
          new_game: "new game:",
          new_game_name_placeholder: "Pseudo",
          remove_career_button: "Remove",
          remove_career_warning: "Are you really sure to delete this game?\nAll progression will be lost.",
        },

        'fr': {
          home_title: "AI World",
          new_game: "nouvelle partie\u00A0:",
          new_game_name_placeholder: "Pseudo",
          remove_career_button: "Supprimer",
          remove_career_warning: "Êtes-vous vraiment sûr de vouloir supprimer cette partie\u00A0?\nToute progression sera perdue.",
        }
      }
    },

    modal: {
      messages: {
        'en': {
          modal_confirm_button: "ok",
          modal_cancel_button: "cancel",
          modal_close_button: "close",
        },

        'fr': {
          modal_confirm_button: "ok",
          modal_cancel_button: "annuler",
          modal_close_button: "fermer",
        }
      }
    },

    level: {
      messages: {
        'en': {
          game_over: "Game Over",
        },

        'fr': {
          game_over: "Game Over",
        }
      },

      code: {
        messages: {
          'en': {
            code_state_ok_tooltip: "Your code is ready to be run",
            code_state_not_runnable_tooltip: "Your instructions are not complete:\nclick me for more details",
            code_state_not_compilable_tooltip: "There is an error in your code:\nclick me for more details",
            code_state_ok_modal: "Your code is ready to be run",
            code_state_not_runnable_modal: "Your code contains %%undefined$undefined%% keywords.\nReplace them by correct values before running your code.",
            switch_editor_warning: "There is an error in your code.\nIf you switch to graphic editor now,\nparts of it risk to be erased.",
            code_error_position_template: "line {line}",
            errors_modal_title: "Errors",

            exception_mismatch_statement_template: "you wrote something erroneous after this {statementType}.",
            exception_mismatch_keyword_template: "you wrote something erroneous after this %%keyword${statementType}%%.",
            exception_mismatch_function_template: "you wrote something erroneous after the function %%function${keyword}()%%.",
            exception_invalid_variable_identifier_template: "%%variable${variable}%% variable name is not allowed. Use one of the following instead: %%variable${allowedIdentifiers}%%.",
            exception_invalid_value_function_template: "%%function${code}%% is not a valid function. Use one of the following instead: %%function${allowedFunctions}%%.",
            exception_forbidden_action_function_template: "%%function${keyword}()%% is not available in this level. Use one of the following instead: %%function${allowedFunctions}%%",
            exception_forbidden_value_function_template: "%%function${keyword}()%% is not available in this level. Use one of the following instead: %%function${allowedFunctions}%%",
            exception_invalid_params_one_dir_template: "%%function${keyword}()%% requires exactly one direction parameter: %%literal${directions}%%",
            exception_invalid_params_one_more_dir_template: "%%function${keyword}()%% requires one or more direction parameters: %%literal${directions}%%",
            exception_invalid_direction_param_template: "%%variable${param}%% is not a valid direction. Use one of these : %%literal${allowedValues}%%",
            exception_duplicate_param_template: "you cannot pass %%literal${param}%% parameter twice to %%function${keyword}()%%",
            exception_forbidden_object_type_template: "%%literal${keyword}%% object type is not available in this level. You can use one of the following: %%literal${allowedValues}%%",
            exception_forbidden_terrain_type_template: "%%literal${keyword}%% terrain type is not available in this level. You can use one of the following: %%literal${allowedValues}%%",
            exception_boolean_no_comparison_operator_template: "a condition must contain a valid comparator like these: %%operator${allowedOperators}%%",
            exception_invalid_expression_template: "%%variable${code}%% is not a valid keyword",
            exception_invalid_statement_template: "%%variable${code}%% is not a valid instruction",
            exception_forbidden_variable_identifier_template: "%%variable${variable}%% variable is unavailable in this level. Use one of the following: %%variable${allowedNames}%%",
            exception_all_forbidden_variable_identifier_template: "variables are not available in this level",

            exception_open_statement_template: "%%keyword${keyword}%% condition must be closed with a %%code$:%%",
            exception_else_no_if_template: "%%keyword${elseKeyword}%% without %%keyword${ifKeyword}%% before",
            exception_endif_no_if_template: "%%keyword${endifKeyword}%% without %%keyword${ifKeyword}%% before",
            exception_if_no_endif_template: "%%keyword${ifKeyword}%% without %%keyword${endifKeyword}%%",
            exception_duplicate_anchor_template: "%%bracket${anchorName}:%% found twice. Anchors must have unique names",
            exception_jump_to_unknown_anchor_template: "%%keyword${jumpKeyword}%% to unknown anchor %%bracket${anchorName}:%%",

            type_anchor: "anchor",
            type_assign: "assignment",
            type_else: "else",
            type_empty: "void",
            type_endif: "endif",
            type_if: "if",
            type_jump: "jump",
            type_direction: "direction",

            function_step: "step",
            function_dir: "dir",
          },

          'fr': {
            code_state_ok_tooltip: "Votre code est prêt à être exécuté",
            code_state_not_runnable_tooltip: "Vos instructions ne sont pas complètes\u00A0:\ncliquez pour plus de détails",
            code_state_not_compilable_tooltip: "Votre code contient une erreur\u00A0:\ncliquez pour plus de détails",
            code_state_ok_modal: "Votre code est prêt à être exécuté",
            code_state_not_runnable_modal: "Votre code contient des mot-clés %%undefined$undefined%%.\nRemplacez-les par des valeurs correctes avant d'exécuter votre code.",
            switch_editor_warning: "Votre code contient une erreur.\nSi vous passez à l'éditeur graphique,\ndes parties de votre code risquent d'être effacées.",
            code_error_position_template: "ligne {line}",
            errors_modal_title: "Erreurs",

            exception_mismatch_statement_template: "vous avez écrit quelque chose d'erroné après cette {statementType}.",
            exception_mismatch_keyword_template: "vous avez écrit quelque chose d'erroné après ce %%keyword${statementType}%%.",
            exception_mismatch_function_template: "vous avez écrit quelque chose d'erroné après la fonction %%function${keyword}()%%.",
            exception_invalid_variable_identifier_template: "%%variable${variable}%% n'est pas un nom de variable autorisé. Utilisez un des noms suivants\u00A0: %%variable${allowedIdentifiers}%%.",
            exception_invalid_value_function_template: "%%function${code}%% n'est pas une fonction valide. Utilisez une des fonctions suivantes\u00A0: %%function${allowedFunctions}%%.",
            exception_forbidden_action_function_template: "%%function${keyword}()%% n'est pas disponible dans ce niveau. Utilisez une des fonctions suivantes\u00A0: %%function${allowedFunctions}%%",
            exception_forbidden_value_function_template: "%%function${keyword}()%% n'est pas disponible dans ce niveau. Utilisez une des fonctions suivantes\u00A0: %%function${allowedFunctions}%%",
            exception_invalid_params_one_dir_template: "%%function${keyword}()%% attend exactement un paramètre de direction\u00A0: %%literal${directions}%%",
            exception_invalid_params_one_more_dir_template: "%%function${keyword}()%% attend un ou plusieurs paramètres de direction\u00A0: %%literal${directions}%%",
            exception_invalid_direction_param_template: "%%variable${param}%% n'est pas une direction valide. Utilisez celles-là\u00A0: %%literal${allowedValues}%%",
            exception_duplicate_param_template: "vous ne pouvez pas donner deux fois %%literal${param}%% à %%function${keyword}()%%",
            exception_forbidden_object_type_template: "le type d'objet %%literal${keyword}%% n'est pas disponible dans ce niveau. Vous pouvez utiliser l'un des suivants\u00A0: %%literal${allowedValues}%%",
            exception_forbidden_terrain_type_template: "le type de terrain %%literal${keyword}%% n'est pas disponible dans ce niveau. Vous pouvez utiliser l'un des suivants\u00A0: %%literal${allowedValues}%%",
            exception_boolean_no_comparison_operator_template: "une condition doit contenir un comparateur valide comme ceux-ci\u00A0: %%operator${allowedOperators}%%",
            exception_invalid_expression_template: "%%variable${code}%% n'est pas un mot-clé valide",
            exception_invalid_statement_template: "%%variable${code}%% n'est pas une instruction valide",
            exception_forbidden_variable_identifier_template: "la variable %%variable${variable}%% n'est pas disponible dans ce niveau. Vous pouvez utiliser l'une des suivantes\u00A0: %%variable${allowedNames}%%",
            exception_all_forbidden_variable_identifier_template: "les variables ne sont pas disponibles dans ce niveau",

            exception_open_statement_template: "la condition du %%keyword${keyword}%% doit être fermée avec un %%code$:%%",
            exception_else_no_if_template: "%%keyword${elseKeyword}%% sans %%keyword${ifKeyword}%% avant",
            exception_endif_no_if_template: "%%keyword${endifKeyword}%% sans %%keyword${ifKeyword}%% avant",
            exception_if_no_endif_template: "%%keyword${ifKeyword}%% sans %%keyword${endifKeyword}%%",
            exception_duplicate_anchor_template: "%%bracket${anchorName}:%% trouvée deux fois. Les ancres doivent avoir des noms uniques",
            exception_jump_to_unknown_anchor_template: "%%keyword${jumpKeyword}%% vers une ancre inconnue %%bracket${anchorName}:%%",

            type_anchor: "ancre",
            type_assign: "assignation",
            type_direction: "direction",
          }
        }
      }
    }
  }
}

class Idiom {
  constructor(config, languages) {
    this.config = config
    this.root = this.config.root
    this.languages = languages

    this.currentLanguage = config.defaultLanguage

    let supportedLanguage = languages.find(lang => !!this.config.languages.includes(lang))
    if (supportedLanguage) {
      this.currentLanguage = supportedLanguage
    }
  }

  getMessage(key) {
    let path = key.split('.')
    let group = this.root
    let message
    try {
      while (path.length >= 1) {
        let pathToken = path.shift()
        if (path.length >= 1) {
          group = group[pathToken]
        } else {
          message = group.messages[this.currentLanguage][pathToken]
          if (!message) {
            message = group.messages[this.config.defaultLanguage][pathToken]
          }
        }
      }
    } catch (e) {
      throw new Error(`lang::: message not found [${key}]`)
    }

    if (!message) {
      throw new Error(`lang::: message not found [${key}]`)
    }
    return message
  }

  text(key, templateValues) {
    if (templateValues) {
      return this.formatTemplate(key, templateValues)
    } else {
      return this.getMessage(key)
    }
  }

  formatTemplate(templateKey, templateValues) {
    let template = this.getMessage(templateKey)
    let values = {}
    for (let key in templateValues) {
      let templateValue = templateValues[key]
      let value = templateValue
      // the value can be a nested template
      if (typeof value === 'object' && templateValue.template) {
        value = this.text(templateValue.template, templateValue.values)
      }
      values[key] = value
    }

    return format(template, values)
  }
}

export default new Idiom(config, window.navigator.languages)